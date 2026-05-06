import { plainToInstance } from 'class-transformer';

import { Vacancies } from '@/features/vacancies/vacancies.entity';
import { GetAllVacanciesQuery } from './get-all-vacancies.query';
import { GetAllVacanciesResponse } from './get-all-vacancies.response';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllVacanciesQuery)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesQuery> {
  async execute(query: GetAllVacanciesQuery): Promise<GetAllVacanciesResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;


    const vacancies = await Vacancies.find({
      skip :skip,
      take : skip,

    });

    return plainToInstance(GetAllVacanciesResponse, vacancies, {
      excludeExtraneousValues: true,
    });
  }
}