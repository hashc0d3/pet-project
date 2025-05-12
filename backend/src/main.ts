import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from '@nestjs/common';
import * as express from 'express'; // Импортируем express

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Устанавливаем лимиты на размер тела запроса
  app.use(express.json({ limit: '10mb' })); // Увеличиваем лимит на размер json
  app.use(express.urlencoded({ limit: '10mb', extended: true })); // Увеличиваем лимит на размер-urlencoded запросов

  // Enable CORS with your frontend's URL
  app.enableCors({
    origin: '*', // Замените на URL вашего фронтенда
    methods: 'GET,POST,PUT,DELETE', // Разрешенные HTTP методы
    allowedHeaders: 'Content-Type, Authorization', // Разрешенные заголовки
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();