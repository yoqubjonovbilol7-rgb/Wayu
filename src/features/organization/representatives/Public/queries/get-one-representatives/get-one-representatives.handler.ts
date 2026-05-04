import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Representatives } from '@/features/organization/representatives/representatives.entity';
import { GetOneRepresentativePublicQuery } from './get-one-representatives.query';
import { GetOneRepresentativePublicResponse } from './get-one-representatives.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneRepresentativePublicQuery)
export class GetOneRepresentativePublicHandler implements IQueryHandler<GetOneRepresentativePublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneRepresentativePublicQuery): Promise<GetOneRepresentativePublicResponse> {
    const representative = await this.manager.findOne(Representatives, {
      where: { id: query.id },
    });

    if (!representative) {
      throw new NotFoundException('Representative not found');
    }

    return plainToInstance(GetOneRepresentativePublicResponse, representative, {
      excludeExtraneousValues: true,
    });
  }
}