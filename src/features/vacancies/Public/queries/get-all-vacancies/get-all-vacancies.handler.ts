import { plainToInstance } from 'class-transformer';

import { Vacancies } from '@/features/vacancies/vacancies.entity';
import { GetAllVacanciesPublicQuery } from './get-all-vacancies.query';
import { GetAllVacanciesPublicResponse } from './get-all-vacancies.response';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllVacanciesPublicQuery)
export class GetAllVacanciesPublicHandler
  implements IQueryHandler<GetAllVacanciesPublicQuery>
{
  async execute(
    query: GetAllVacanciesPublicQuery,
  ): Promise<GetAllVacanciesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;

    const skip = (currentPage - 1) * take;

    const vacancies = await Vacancies.find({
      where: {
        isActive: true,
      },
      skip,
      take,

    });

    return plainToInstance(GetAllVacanciesPublicResponse, vacancies, {
      excludeExtraneousValues: true,
    });
  }
}