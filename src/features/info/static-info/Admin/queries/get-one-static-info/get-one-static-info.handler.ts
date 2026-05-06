import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';
import {GetOneStaticInfoQuery} from './get-one-static-info.query';
import {GetOneStaticInfoResponse} from './get-one-static-info.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneStaticInfoQuery)
export class GetOneStaticInfoHandler implements IQueryHandler<GetOneStaticInfoQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneStaticInfoQuery): Promise<GetOneStaticInfoResponse> {
    const staticInfo = await this.manager.findOne(StaticInfo, {
      where: { id: query.id },
    });

    if (!staticInfo) {
      throw new NotFoundException('Static info not found');
    }

    return plainToInstance(GetOneStaticInfoResponse, staticInfo, {
      excludeExtraneousValues: true,
    });
  }
}