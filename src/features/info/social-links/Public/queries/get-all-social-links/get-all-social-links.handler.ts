import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { SocialLinks } from '@/features/info/social-links/socialLinks.entity';
import { GetAllSocialLinksPublicQuery } from './get-all-social-links.query';
import { GetAllSocialLinksPublicResponse } from './get-all-social-links.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllSocialLinksPublicQuery)
export class GetAllSocialLinksPublicHandler implements IQueryHandler<GetAllSocialLinksPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllSocialLinksPublicQuery): Promise<GetAllSocialLinksPublicResponse> {
    const { page = 1, limit = 10 } = query.filters;
    const [data, total] = await this.manager.findAndCount(SocialLinks, {
      take: limit,
      skip: (page - 1) * limit,
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllSocialLinksPublicResponse, { data, total }, { excludeExtraneousValues: true });
  }
}