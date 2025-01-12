import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LoggerMiddleware().use);

  const config = new DocumentBuilder()
    .setTitle('NestJS MongoDB CRUD')
    .setDescription(
      'The API documentation for the NestJS MongoDB CRUD application',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}
bootstrap();
