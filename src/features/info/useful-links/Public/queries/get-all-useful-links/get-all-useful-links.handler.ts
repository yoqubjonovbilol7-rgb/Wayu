import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { UsefulLinks } from '@/features/info/useful-links/usefulLinks.entity';
import { GetAllUsefulLinksPublicQuery } from './get-all-useful-links.query';
import { GetAllUsefulLinksPublicResponse } from './get-all-useful-links.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllUsefulLinksPublicQuery)
export class GetAllUsefulLinksPublicHandler implements IQueryHandler<GetAllUsefulLinksPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllUsefulLinksPublicQuery): Promise<GetAllUsefulLinksPublicResponse> {
    const { page = 1, limit = 10 } = query.filters;
    const [data, total] = await this.manager.findAndCount(UsefulLinks, {
      take: limit,
      skip: (page - 1) * limit,
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllUsefulLinksPublicResponse, { data, total }, { excludeExtraneousValues: true });
  }
}