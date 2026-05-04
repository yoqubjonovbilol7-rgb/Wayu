import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { GetOneVacancyPublicQuery } from './get-one-vacancies.query';
import { Vacancies } from '@/features/vacancies/vacancies.entity';
import { GetOneVacancyPublicResponse } from './get-one-vacancies.response';

@QueryHandler(GetOneVacancyPublicQuery)
export class GetOneVacancyPublicHandler implements IQueryHandler<GetOneVacancyPublicQuery> {
  async execute(query: GetOneVacancyPublicQuery): Promise<GetOneVacancyPublicResponse> {
    const vacancy = await Vacancies.findOne({
      where: { id: query.id, isActive: true },
    });
    if (!vacancy) {
      throw new NotFoundException(`Vacancy with id ${query.id} not found`);
    }

    return plainToInstance(GetOneVacancyPublicResponse, vacancy, { excludeExtraneousValues: true });
  }
}