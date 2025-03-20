import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './tasks/task.entity';
import { SubTask } from './tasks/sub-task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.NODE_ENV == 'production'
          ? process.env.DATABASE_URL
          : 'postgres://postgres:postgres@localhost:5432/task_master',
      entities: [Task, SubTask],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TasksModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
