import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { SubTask } from './sub-task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(SubTask)
    private subTaskRepository: Repository<SubTask>
  ) {}

  async findAll(filter: any): Promise<Task[]> {
    try {
      // 使用更簡單的 find 方法，不使用 QueryBuilder
      const tasks = await this.tasksRepository.find({
        where: filter,
        relations: ['subTasks'],
        order: { id: 'ASC' },
      });

      // 手動排序子任務
      tasks.forEach((task) => {
        if (task.subTasks) {
          task.subTasks.sort((a, b) => a.id - b.id);
        }
      });

      const currentDate = new Date();
      return tasks.map((task) => {
        const expiredAt = new Date(task.expired_at);
        const isExpired = expiredAt < currentDate;
        const willExpireInThreeDays =
          expiredAt.getTime() - currentDate.getTime() <=
            3 * 24 * 60 * 60 * 1000 && !isExpired;
        return {
          ...task,
          willExpireInThreeDays,
          isExpired,
        };
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['subTasks'],
    });
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);

    if (task.subTasks) {
      newTask.subTasks = task.subTasks.map((subTask) => {
        const newSubTask = this.subTaskRepository.create(subTask);
        return newSubTask;
      });
    }

    return this.tasksRepository.save(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    // 先確保 task 存在
    const existingTask = await this.tasksRepository.findOne({
      where: { id },
      relations: ['subTasks'],
    });

    // 更新主任務（不包括 subTasks）
    const taskToUpdate = { ...task };
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
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['subTasks'],
    });
  }

  async remove(id: number): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['subTasks'],
    });

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
}
