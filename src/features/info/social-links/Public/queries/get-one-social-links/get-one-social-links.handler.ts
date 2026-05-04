import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SocialLinks } from '@/features/info/social-links/socialLinks.entity';
import { GetOneSocialLinkPublicQuery } from './get-one-social-links.query';
import { GetOneSocialLinkPublicResponse } from './get-one-social-links.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneSocialLinkPublicQuery)
export class GetOneSocialLinkPublicHandler implements IQueryHandler<GetOneSocialLinkPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneSocialLinkPublicQuery): Promise<GetOneSocialLinkPublicResponse> {
    const socialLink = await this.manager.findOne(SocialLinks, {
      where: { id: query.id },
    });

    if (!socialLink) {
      throw new NotFoundException('Social link not found');
    }

    return plainToInstance(GetOneSocialLinkPublicResponse, socialLink, {
      excludeExtraneousValues: true,
    });
  }
}