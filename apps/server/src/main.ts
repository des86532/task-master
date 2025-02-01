/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: [
      'https://task-master-frontend-xi.vercel.app',
      'http://localhost:3000',
    ], // 允許的來源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允許的 HTTP 方法
    credentials: true, // 如果需要允許帶有憑證的請求
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
