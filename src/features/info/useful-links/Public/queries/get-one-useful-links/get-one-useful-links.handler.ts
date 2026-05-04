import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UsefulLinks } from '@/features/info/useful-links/usefulLinks.entity';
import { GetOneUsefulLinkPublicQuery } from './get-one-useful-links.query';
import { GetOneUsefulLinkPublicResponse } from './get-one-useful-links.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneUsefulLinkPublicQuery)
export class GetOneUsefulLinkPublicHandler implements IQueryHandler<GetOneUsefulLinkPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneUsefulLinkPublicQuery): Promise<GetOneUsefulLinkPublicResponse> {
    const usefulLink = await this.manager.findOne(UsefulLinks, {
      where: { id: query.id },
    });

    if (!usefulLink) {
      throw new NotFoundException('Useful link not found');
    }

    return plainToInstance(GetOneUsefulLinkPublicResponse, usefulLink, {
      excludeExtraneousValues: true,
    });
  }
}