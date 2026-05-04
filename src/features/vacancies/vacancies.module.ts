import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Vacancies } from './vacancies.entity';
import { VacanciesAdminController } from './Admin/vacancies.admin.controller';
import { VacanciesPublicController } from './Public/vacancies.public.controller';
import { GetAllVacanciesHandler } from './Admin/queries/get-all-vacancies/get-all-vacancies.handler';
import { CreateVacanciesHandler } from './Admin/commands/create-vacancies/create-vacancies.handler';
import { DeleteVacanciesHandler } from './Admin/commands/delete-vacancies/delete-vacancies.handler';
import { GetOneVacanciesHandler } from './Admin/queries/get-one-vacancies/get-one-vacancies.handler';
import { UpdateVacanciesHandler } from './Admin/commands/update-vacancies/update-vacancies.handler';
import { GetAllVacanciesPublicHandler } from './Public/queries/get-all-vacancies/get-all-vacancies.handler';
import { GetOneVacancyPublicHandler } from './Public/queries/get-one-vacancies/get-one-vacancies.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancies]), CqrsModule],
  controllers: [VacanciesAdminController, VacanciesPublicController],
  providers: [
    GetAllVacanciesHandler,
    CreateVacanciesHandler,
    DeleteVacanciesHandler,
    GetOneVacanciesHandler,
    UpdateVacanciesHandler,
    GetAllVacanciesPublicHandler,
    GetOneVacancyPublicHandler,
  ],
})
export class VacanciesModule {}