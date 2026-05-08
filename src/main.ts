import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './config/swagger.config';
import {NestExpressApplication} from '@nestjs/platform-express';
import { join } from 'path'
import morgan from "morgan";


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({origin: '*'})
  configureSwagger(app)
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.use(morgan('dev'))

  app.useStaticAssets(join(__dirname,'..','uploads'),{prefix: '/uploads/'})

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();