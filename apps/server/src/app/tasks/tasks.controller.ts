import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { MonthTaskStatsType, TaskSummaryType } from '@task-master/shared';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() filter: any): Promise<Task[]> {
    return this.tasksService.findAll(filter);
  }

  @Get('stats')
  async getStats(): Promise<TaskSummaryType> {
    return await this.tasksService.getTaskStats();
  }

  @Get('stats-monthly')
  async getTasksStatsMonthly(): Promise<MonthTaskStatsType[]> {
    return await this.tasksService.getTasksMonthly();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.update(+id, task);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.update(+id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }

  @Patch()
  patchMany(
    @Body() payload: { ids: number[]; task: Partial<Task> }
  ): Promise<Task[]> {
    return this.tasksService.patchMany(payload.ids, payload.task);
  }
}
