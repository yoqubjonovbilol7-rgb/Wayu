import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import { GetAllNewsQuery } from './get-all-news.query';
import { GetAllNewsResponse } from './get-all-news.response';

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery> {

  async execute(query: GetAllNewsQuery): Promise<GetAllNewsResponse> {
    const filters = query.filters;
    const skip = (filters.page - 1) * filters.limit;
    const take = filters.limit;



    return plainToInstance(GetAllNewsResponse, {skip : skip,take :take,

    }, { excludeExtraneousValues: true });
  }
}