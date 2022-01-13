import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = 3000;
  await app.listen(port);

  const logger = new Logger('TaskManagement');
  logger.log(`Application successfully running on port: ${port}`);
}
bootstrap();