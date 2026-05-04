import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApplicationsController} from "@/features/careers/applications/Admin/applications.admin.controller";
import {CreateApplicationsHandler} from "@/features/careers/applications/Admin/commands/create-applications/create-applications.handler";
import {DeleteApplicationsHandler} from "@/features/careers/applications/Admin/commands/delete-applications/delete-applications.handler";
import {UpdateApplicationsHandler} from "@/features/careers/applications/Admin/commands/update-applications/update-applications.handler";
import {ApplicationsPublicController} from "@/features/careers/applications/Public/applications.public.controller";
import {GetAllApplicationsPublicHandler} from "@/features/careers/applications/Public/queries/get-all-applications/get-all-applications.handler";
import {GetOneApplicationPublicHandler} from "@/features/careers/applications/Public/queries/get-one-applications/get-one-applications.handler";
import {VacanciesAdminController} from "@/features/careers/vacancies/Admin/vacancies.admin.controller";
import {CreateVacanciesHandler} from "@/features/careers/vacancies/Admin/commands/create-vacancies/create-vacancies.handler";
import {UpdateVacanciesHandler} from "@/features/careers/vacancies/Admin/commands/update-vacancies/update-vacancies.handler";
import {DeleteVacanciesHandler} from "@/features/careers/vacancies/Admin/commands/delete-vacancies/delete-vacancies.handler";
import {GetAllVacanciesHandler} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.handler";
import {GetOneVacanciesHandler} from "@/features/careers/vacancies/Admin/queries/get-one-vacancies/get-one-vacancies.handler";
import {Applications} from "@/features/careers/applications/applications.entity";
import {Vacancies} from "@/features/careers/vacancies/vacancies.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Applications, Vacancies])],
  controllers : [
    ApplicationsController,
    ApplicationsPublicController,
    VacanciesAdminController,
  ],
  providers : [
    CreateApplicationsHandler,
    DeleteApplicationsHandler,
    UpdateApplicationsHandler,
    GetAllApplicationsPublicHandler,
    GetOneApplicationPublicHandler,
    CreateVacanciesHandler,
    UpdateVacanciesHandler,
    DeleteVacanciesHandler,
    GetAllVacanciesHandler,
    GetOneVacanciesHandler,
  ]
})


export class CareersModule {}