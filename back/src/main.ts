import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(loggerGlobal);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo nest')
    .setDescription('Esta es una api construida por nest para ser empleada en las demos del módulo 4 de la especialidad Backend de la carrera Fullstack Developer de soyHenry')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
    
  await app.listen(3000);
}

bootstrap();
