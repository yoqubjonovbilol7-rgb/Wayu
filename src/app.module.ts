import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from "@nestjs/cqrs";
import {NewsModule} from "./features/news/news.module";
import {typeOrmConfig} from "@/config/typeorm.config";
import {LibraryModule} from "@/features/library/library.module";
import {OrganizationModule} from "@/features/organization/organization.module";
import {EventsModule} from "@/features/events/events.module";
import {SupportModule} from "@/features/support/support.module";
import {SocialModule} from "@/features/social-media/social-module";
import {InfoModule} from "@/features/info/info.module";
import {CareersModule} from "@/features/careers/careers.module";
import {VacanciesModule} from "@/features/vacancies/vacancies.module";

import {UsersModule} from "./users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        CqrsModule.forRoot(),
        UsersModule,
        NewsModule,
        LibraryModule,
        OrganizationModule,
        EventsModule,
        SupportModule,
        SocialModule,
        InfoModule,
        CareersModule,
        VacanciesModule,
    ],
})
export class AppModule {
}