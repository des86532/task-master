import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async findAll(filter: any): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({
      where: filter,
      order: { id: 'ASC' },
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
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, task);
    return this.tasksRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async patchMany(ids: number[], task: Partial<Task>): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByIds(ids);
    tasks.forEach((item) => {
      Object.assign(item, task);
    });
    return this.tasksRepository.save(tasks);
  }
}
