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
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import {
  MonthTaskStatsType,
  TaskSummaryType,
  TaskType,
} from '@task-master/shared';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() filter: any): Promise<TaskType[]> {
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
  findOne(@Param('id') id: string): Promise<TaskType> {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  create(@Body() task: Partial<Task>, @Req() req): Promise<TaskType> {
    return this.tasksService.create(task, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() task: Partial<Task>,
    @Req() req
  ): Promise<TaskType> {
    return this.tasksService.update(+id, task, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() task: Partial<Task>,
    @Req() req
  ): Promise<TaskType> {
    return this.tasksService.update(+id, task, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req): Promise<void> {
    return this.tasksService.remove(+id, req.user);
  }

  @Patch()
  patchMany(
    @Body() payload: { ids: number[]; task: Partial<Task> }
  ): Promise<Task[]> {
    return this.tasksService.patchMany(payload.ids, payload.task);
  }
}
