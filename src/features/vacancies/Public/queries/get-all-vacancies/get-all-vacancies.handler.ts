import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { Vacancies } from '@/features/vacancies/vacancies.entity';
import { GetAllVacanciesPublicQuery } from './get-all-vacancies.query';
import { GetAllVacanciesPublicResponse } from './get-all-vacancies.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllVacanciesPublicQuery)
export class GetAllVacanciesPublicHandler implements IQueryHandler<GetAllVacanciesPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllVacanciesPublicQuery): Promise<GetAllVacanciesPublicResponse> {
    const { page = 1, size = 10 } = query.filters;
    const [data, total] = await this.manager.findAndCount(Vacancies, {
      take: size,
      skip: (page - 1) * size,
      where: { isActive: true },
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllVacanciesPublicResponse, {data, total}, { excludeExtraneousValues: true });
  }
}