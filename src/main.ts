import 'dotenv/config';
import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";
import {configureSwagger} from "@/config/swagger.config";
import {AppModule} from "@/app.module";
import {join} from "path";
import {ValidationPipe} from "@nestjs/common";


async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    configureSwagger(app);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));

    await app.listen(3000, () => console.log("Server is up and running"));

    app.useStaticAssets(join(__dirname, '..', 'uploads'));
}

bootstrap();