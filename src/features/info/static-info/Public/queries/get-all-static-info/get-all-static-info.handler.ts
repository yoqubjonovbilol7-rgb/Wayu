import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';
import { GetAllStaticInfoPublicQuery } from './get-all-static-info.query';
import { GetAllStaticInfoPublicResponse } from './get-all-static-info.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllStaticInfoPublicQuery)
export class GetAllStaticInfoPublicHandler implements IQueryHandler<GetAllStaticInfoPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllStaticInfoPublicQuery): Promise<GetAllStaticInfoPublicResponse> {
    const { page = 1, limit = 10 } = query.filters;
    const [data, total] = await this.manager.findAndCount(StaticInfo, {
      take: limit,
      skip: (page - 1) * limit,
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllStaticInfoPublicResponse, { data, total }, { excludeExtraneousValues: true });
  }
}