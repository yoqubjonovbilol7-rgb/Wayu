import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { Vacancies } from '@/features/vacancies/vacancies.entity';
import { GetAllVacanciesQuery } from './get-all-vacancies.query';
import { GetAllVacanciesResponse } from './get-all-vacancies.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllVacanciesQuery)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllVacanciesQuery): Promise<GetAllVacanciesResponse> {
    const { page = 1, size = 10, type, isActive } = query.filters;
    const where: any = {};
    if (type !== undefined) where.type = type;
    if (isActive !== undefined) where.isActive = isActive;

    const [data, total] = await this.manager.findAndCount(Vacancies, {
      where,
      take: size,
      skip: (page - 1) * size,
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllVacanciesResponse, {data, total}, { excludeExtraneousValues: true });
  }
}
