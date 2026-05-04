import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { Applications } from '@/features/careers/applications/applications.entity';
import { GetAllApplicationsPublicQuery } from './get-all-applications.query';
import { GetAllApplicationsPublicResponse } from './get-all-applications.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllApplicationsPublicQuery)
export class GetAllApplicationsPublicHandler implements IQueryHandler<GetAllApplicationsPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllApplicationsPublicQuery): Promise<GetAllApplicationsPublicResponse> {
    const { page = 1, limit = 10 } = query.filters;
    const [data, total] = await this.manager.findAndCount(Applications, {
      take: limit,
      skip: (page - 1) * limit,
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllApplicationsPublicResponse, { data, total }, { excludeExtraneousValues: true });
  }
}