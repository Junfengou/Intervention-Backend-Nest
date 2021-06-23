import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // global validation decorator
  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  const config = new DocumentBuilder()
  .setTitle('Nest Api')
  .setDescription('Dope Api lol')
  .setVersion('1.0')
  .build();

  // Tie in app and swagger config
  const document = SwaggerModule.createDocument(app, config)

  // complete setup
  SwaggerModule.setup('/swag', app, document);

  await app.listen(7000);
}
bootstrap();
