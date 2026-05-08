import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { typeOrmConfig } from "@/config/typeorm.config";
import { jwtModuleConfig } from "@/config/jwt-config";

import { NewsModule } from "./features/news/news.module";
import { LibraryModule } from "@/features/library/library.module";
import { OrganizationModule } from "@/features/organization/organization.module";
import { EventsModule } from "@/features/events/events.module";
import { SupportModule } from "@/features/support/support.module";
import { SocialModule } from "@/features/social-media/social-module";
import { InfoModule } from "@/features/info/info.module";
import { CareersModule } from "@/features/careers/careers.module";
import { VacanciesModule } from "@/features/vacancies/vacancies.module";
import { AuthModule } from "@/features/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        DEFAULT_DB_URL: Joi.string().required(),
        TEST_DB_URL: Joi.string().required(),
        DEFAULT_SIZE: Joi.number().required(),
        DEFAULT_PAGE: Joi.number().required(),
        BASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    JwtModule.register(jwtModuleConfig),
    NewsModule,
    LibraryModule,
    OrganizationModule,
    EventsModule,
    SupportModule,
    SocialModule,
    InfoModule,
    CareersModule,
    VacanciesModule,
    AuthModule,
  ],
})
export class AppModule {}