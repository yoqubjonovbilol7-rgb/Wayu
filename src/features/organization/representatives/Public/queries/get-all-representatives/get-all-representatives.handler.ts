import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { Representatives } from '@/features/organization/representatives/representatives.entity';
import { GetAllRepresentativesPublicQuery } from './get-all-representatives.query';
import { GetAllRepresentativesPublicResponse } from './get-all-representatives.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllRepresentativesPublicQuery)
export class GetAllRepresentativesPublicHandler implements IQueryHandler<GetAllRepresentativesPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllRepresentativesPublicQuery): Promise<GetAllRepresentativesPublicResponse> {
    const { page = 1, limit = 10 } = query.filters;
    const [data, total] = await this.manager.findAndCount(Representatives, {
      take: limit,
      skip: (page - 1) * limit,
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllRepresentativesPublicResponse, { data, total }, { excludeExtraneousValues: true });
  }
}