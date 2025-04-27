import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { SubTask } from './sub-task.entity';
import { User } from '../auth/user.entity';
import {
  TaskStatus,
  MonthTaskStatsType,
  TaskSummaryType,
  TaskType,
  UserType,
} from '@task-master/shared';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(SubTask)
    private subTaskRepository: Repository<SubTask>
  ) {}

  async findAll(filter: any): Promise<TaskType[]> {
    try {
      // 使用更簡單的 find 方法，不使用 QueryBuilder
      const tasks = await this.tasksRepository.find({
        where: filter,
        relations: ['subTasks', 'created_by', 'updated_by'],
        order: { id: 'ASC' },
      });

      // 手動排序子任務
      tasks.forEach((task) => {
        if (task.subTasks) {
          task.subTasks.sort((a, b) => a.id - b.id);
        }
      });

      return tasks.map((task) => this.formatTask(task));
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<TaskType> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
        relations: ['subTasks', 'created_by', 'updated_by'],
      });
      return this.formatTask(task);
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error;
    }
  }

  async create(task: Partial<Task>, user: User): Promise<TaskType> {
    const newTask = this.tasksRepository.create({
      ...task,
      created_by: user,
      updated_by: user,
    });

    if (task.subTasks) {
      newTask.subTasks = task.subTasks.map((subTask) => {
        const newSubTask = this.subTaskRepository.create(subTask);
        return newSubTask;
      });
    }

    const savedTask = await this.tasksRepository.save(newTask);
    // 重新查一次，帶 relations
    const fullTask = await this.tasksRepository.findOne({
      where: { id: savedTask.id },
      relations: ['subTasks', 'created_by', 'updated_by'],
    });
    return this.formatTask(fullTask);
  }

  async update(id: number, task: Partial<Task>, user: User): Promise<TaskType> {
    // 先確保 task 存在
    const existingTask = await this.tasksRepository.findOne({
      where: { id },
      relations: ['subTasks'],
    });

    // 更新主任務（不包括 subTasks）
    const taskToUpdate = { ...task, updated_by: user };
    delete taskToUpdate.subTasks;
    await this.tasksRepository.update(id, taskToUpdate);

    // 處理 subTasks
    if (task.subTasks !== undefined) {
      // 創建一個映射來跟踪現有子任務
      const existingSubTaskMap = new Map(
        existingTask.subTasks.map((st) => [st.id, st])
      );

      // 跟踪要保留的子任務 ID
      const keepSubTaskIds = new Set();

      // 處理每個傳入的子任務
      if (task.subTasks && task.subTasks.length > 0) {
        await Promise.all(
          task.subTasks.map(async (subTaskData) => {
            if (subTaskData.id && existingSubTaskMap.has(subTaskData.id)) {
              // 更新現有子任務
              const existingSubTask = existingSubTaskMap.get(subTaskData.id);
              // 只更新提供的字段
              Object.assign(existingSubTask, subTaskData);
              await this.subTaskRepository.save(existingSubTask);
              // 標記這個子任務應該保留
              keepSubTaskIds.add(subTaskData.id);
            } else {
              // 創建新子任務
              const newSubTask = this.subTaskRepository.create({
                ...subTaskData,
                task: { id }, // 引用父任務
              });
              await this.subTaskRepository.save(newSubTask);
            }
          })
        );
      }

      // 刪除不再存在於新列表中的子任務
      const subTasksToDelete = existingTask.subTasks.filter(
        (st) => !keepSubTaskIds.has(st.id)
      );

      if (subTasksToDelete.length > 0) {
        await this.subTaskRepository.remove(subTasksToDelete);
      }
    }

    // 返回更新後的 task 及其 subTasks
    const fullTask = await this.tasksRepository.findOne({
      where: { id },
      relations: ['subTasks', 'created_by', 'updated_by'],
    });
    return this.formatTask(fullTask);
  }

  async remove(id: number, user: User): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['subTasks', 'created_by'],
    });

    // 非創建者不可刪除
    if (task.created_by !== null && task.created_by.id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this task'
      );
    }

    if (task) {
      if (task.subTasks && task.subTasks.length > 0) {
        await this.subTaskRepository.remove(task.subTasks);
      }

      await this.tasksRepository.delete(id);
    }
  }

  async patchMany(ids: number[], task: Partial<Task>): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByIds(ids);
    tasks.forEach((item) => {
      Object.assign(item, task);
    });
    return this.tasksRepository.save(tasks);
  }

  async getTaskStats(): Promise<TaskSummaryType> {
    try {
      const [pendingTasks, pendingTotal] =
        await this.tasksRepository.findAndCount({
          where: { status: TaskStatus.PENDING },
        });

      const [progressingTasks, progressingTotal] =
        await this.tasksRepository.findAndCount({
          where: { status: TaskStatus.PROGRESS },
        });

      // 獲取當前時間的起始點
      const now = new Date();
      const startOfDay = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const startOfMonth = new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), 1)
      );

      // 查詢已完成任務的數量，按時間段分類
      const completedStats = await this.tasksRepository
        .createQueryBuilder('task')
        .select([
          `SUM(CASE WHEN task.updated_at >= :startOfDay THEN 1 ELSE 0 END) as day`,
          `SUM(CASE WHEN task.updated_at >= :startOfWeek THEN 1 ELSE 0 END) as week`,
          `SUM(CASE WHEN task.updated_at >= :startOfMonth THEN 1 ELSE 0 END) as month`,
        ])
        .where('task.status = :status', { status: TaskStatus.COMPLETED })
        .andWhere('task.updated_at IS NOT NULL')
        .setParameters({
          startOfDay: startOfDay.toISOString(),
          startOfWeek: startOfWeek.toISOString(),
          startOfMonth: startOfMonth.toISOString(),
        })
        .getRawOne();

      return {
        pending: pendingTotal,
        progress: progressingTotal,
        completed: {
          day: completedStats?.day ? parseInt(completedStats.day) : 0,
          week: completedStats?.week ? parseInt(completedStats.week) : 0,
          month: completedStats?.month ? parseInt(completedStats.month) : 0,
        },
      };
    } catch (error) {
      console.error('Error getting task stats:', error);
      throw error;
    }
  }

  async getTasksMonthly(): Promise<MonthTaskStatsType[]> {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // 查詢每日的任務統計
      const dailyStats = await this.tasksRepository
        .createQueryBuilder('task')
        .select([
          'DATE(task.updated_at) as date',
          `SUM(CASE WHEN task.status = :pending THEN 1 ELSE 0 END) as pending`,
          `SUM(CASE WHEN task.status = :progress THEN 1 ELSE 0 END) as progress`,
          `SUM(CASE WHEN task.status = :completed THEN 1 ELSE 0 END) as completed`,
        ])
        .where(
          'task.updated_at >= :startOfMonth AND task.updated_at <= :endOfMonth',
          {
            startOfMonth: startOfMonth.toISOString(),
            endOfMonth: endOfMonth.toISOString(),
          }
        )
        .setParameters({
          pending: TaskStatus.PENDING,
          progress: TaskStatus.PROGRESS,
          completed: TaskStatus.COMPLETED,
        })
        .groupBy('DATE(task.updated_at)')
        .orderBy('DATE(task.updated_at)', 'ASC')
        .getRawMany();

      // 將每日數據分組為每七天一組
      const weeklyStats = this.groupByWeek(
        dailyStats,
        startOfMonth,
        endOfMonth
      );

      return weeklyStats;
    } catch (error) {
      console.error('Error getting monthly task stats:', error);
      throw error;
    }
  }

  // 將每日數據分組為每七天一組
  private groupByWeek(
    dailyStats: {
      date: string;
      pending: string;
      progress: string;
      completed: string;
    }[],
    startOfMonth: Date,
    endOfMonth: Date
  ): MonthTaskStatsType[] {
    const weeklyStats: MonthTaskStatsType[] = [];
    const currentWeekStart = new Date(startOfMonth);
    const currentWeekEnd = new Date(startOfMonth);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

    while (currentWeekStart <= endOfMonth) {
      const weekStats = dailyStats
        .filter((stat) => {
          const date = new Date(stat.date);
          return date >= currentWeekStart && date <= currentWeekEnd;
        })
        .reduce(
          (acc, stat) => {
            acc.pending += parseInt(stat.pending) || 0;
            acc.progress += parseInt(stat.progress) || 0;
            acc.completed += parseInt(stat.completed) || 0;
            return acc;
          },
          { pending: 0, progress: 0, completed: 0 }
        );

      weeklyStats.push({
        startDate: currentWeekStart.toISOString(),
        endDate: currentWeekEnd.toISOString(),
        pending: weekStats.pending,
        progress: weekStats.progress,
        completed: weekStats.completed,
      });

      // 移動到下週
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);
    }

    return weeklyStats;
  }

  private formatTask(task: Task): TaskType {
    const currentDate = new Date();
    const expiredAt = new Date(task.expired_at);
    const isExpired = expiredAt < currentDate;
    const willExpireInThreeDays =
      expiredAt.getTime() - currentDate.getTime() <= 3 * 24 * 60 * 60 * 1000 &&
      !isExpired;

    return {
      ...task,
      status: task.status as TaskStatus,
      created_by: this.formatUser(task.created_by),
      updated_by: this.formatUser(task.updated_by),
      willExpireInThreeDays,
      isExpired,
    };
  }

  private formatUser(user: User | null): UserType | null {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }
}
