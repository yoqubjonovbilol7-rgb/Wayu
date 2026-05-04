import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Representatives } from '@/features/organization/representatives/representatives.entity';
import { GetOneRepresentativesQuery } from './get-one-representatives.query';
import { GetOneRepresentativesResponse } from './get-one-representatives.response';

@QueryHandler(GetOneRepresentativesQuery)
export class GetOneRepresentativesHandler
  implements IQueryHandler<GetOneRepresentativesQuery>
{
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneRepresentativesQuery): Promise<GetOneRepresentativesResponse> {
    const representative = await this.manager.findOne(Representatives, {
      where: { id: query.id },
    });

    if (!representative) {
      throw new NotFoundException('Representative not found');
    }

    return plainToInstance(GetOneRepresentativesResponse, representative, {
      excludeExtraneousValues: true,
    });
  }
}
