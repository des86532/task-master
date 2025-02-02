import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { cardListData } from '@task-master/shared';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // In-memory storage for tasks

  constructor() {
    this.tasks = cardListData; // Initialize with existing data if needed
  }

  findAll(filter: any): Promise<Task[]> {
    return Promise.resolve(this.tasks); // Return in-memory tasks
  }

  findOne(id: number): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    return Promise.resolve(task); // Return found task or undefined
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = { id: this.tasks.length + 1, ...task } as Task; // Assign a new ID
    this.tasks.push(newTask); // Add to in-memory storage
    return Promise.resolve(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index > -1) {
      this.tasks[index] = { ...this.tasks[index], ...task }; // Update task
      return Promise.resolve(this.tasks[index]);
    }
    return Promise.reject(new Error('Task not found'));
  }

  async remove(id: number): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id); // Remove task
    return Promise.resolve();
  }

  async patchMany(ids: number[], task: Partial<Task>): Promise<Task[]> {
    const updatedTasks = this.tasks.filter((item) => ids.includes(item.id));
    updatedTasks.forEach((item) => {
      Object.assign(item, task);
    });
    return Promise.resolve(updatedTasks); // Return updated tasks
  }
}
