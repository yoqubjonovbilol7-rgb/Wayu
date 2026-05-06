import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UsefulLinks } from '@/features/info/useful-links/usefulLinks.entity';

import { plainToInstance } from 'class-transformer';
import {GetOneUsefulLinkQuery} from "@/features/info/useful-links/Admin/queries/get-one-social-links/get-one-useful-links.query";
import {GetOneUsefulLinkResponse} from "@/features/info/useful-links/Admin/queries/get-one-social-links/get-one-useful-links.response";


@QueryHandler(GetOneUsefulLinkQuery)
export class GetOneUsefulLinkHandler implements IQueryHandler<GetOneUsefulLinkQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneUsefulLinkQuery): Promise<GetOneUsefulLinkResponse> {
    const usefulLink = await this.manager.findOne(UsefulLinks, {
      where: { id: query.id },
    });

    if (!usefulLink) {
      throw new NotFoundException('Useful link not found');
    }

    return plainToInstance(GetOneUsefulLinkResponse, usefulLink, {
      excludeExtraneousValues: true,
    });
  }
}