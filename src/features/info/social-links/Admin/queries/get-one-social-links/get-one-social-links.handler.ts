import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SocialLinks } from '@/features/info/social-links/socialLinks.entity';

import { plainToInstance } from 'class-transformer';
import {GetOneSocialLinkQuery} from "@/features/info/social-links/Admin/queries/get-one-social-links/get-one-social-links.query";
import {GetOneSocialLinkResponse} from "@/features/info/social-links/Admin/queries/get-one-social-links/get-one-social-links.response";

@QueryHandler(GetOneSocialLinkQuery)
export class GetOneSocialLinkHandler implements IQueryHandler<GetOneSocialLinkQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneSocialLinkQuery): Promise<GetOneSocialLinkResponse> {
    const socialLink = await this.manager.findOne(SocialLinks, {
      where: { id: query.id },
    });

    if (!socialLink) {
      throw new NotFoundException('Social link not found');
    }

    return plainToInstance(GetOneSocialLinkResponse, socialLink, {
      excludeExtraneousValues: true,
    });
  }
}