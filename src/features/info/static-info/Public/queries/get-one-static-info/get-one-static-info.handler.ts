import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';
import { GetOneStaticInfoPublicQuery } from './get-one-static-info.query';
import { GetOneStaticInfoPublicResponse } from './get-one-static-info.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneStaticInfoPublicQuery)
export class GetOneStaticInfoPublicHandler implements IQueryHandler<GetOneStaticInfoPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneStaticInfoPublicQuery): Promise<GetOneStaticInfoPublicResponse> {
    const staticInfo = await this.manager.findOne(StaticInfo, {
      where: { id: query.id },
    });

    if (!staticInfo) {
      throw new NotFoundException('Static info not found');
    }

    return plainToInstance(GetOneStaticInfoPublicResponse, staticInfo, {
      excludeExtraneousValues: true,
    });
  }
}