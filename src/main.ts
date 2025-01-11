import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LoggerMiddleware().use);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}
bootstrap();
