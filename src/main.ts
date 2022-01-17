import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformInterceptor());

  const port = process.env.PORT;
  await app.listen(port);

  const logger = new Logger('TaskManagement');
  logger.log(`Application successfully running on port: ${port}`);
}
bootstrap();
