import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { Representatives } from '@/features/organization/representatives/representatives.entity';
import { GetAllRepresentativesPublicQuery } from './get-all-representatives.query';
import { GetAllRepresentativesPublicResponse } from './get-all-representatives.response';

@QueryHandler(GetAllRepresentativesPublicQuery)
export class GetAllRepresentativesPublicHandler
  implements IQueryHandler<GetAllRepresentativesPublicQuery>
{


  async execute(
    query: GetAllRepresentativesPublicQuery,
  ): Promise<GetAllRepresentativesPublicResponse[]> {
    const take = query.filters?.size ?? 10;
    const page = query.filters?.page ?? 1;
    const skip = (page - 1) * take;

    const data = await Representatives.find({
      skip : skip,
      take :take,
    });

    return plainToInstance(GetAllRepresentativesPublicResponse, data, {
      excludeExtraneousValues: true,
    });
  }
}