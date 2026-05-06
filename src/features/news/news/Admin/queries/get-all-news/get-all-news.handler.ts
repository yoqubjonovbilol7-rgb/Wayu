import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import { GetAllNewsQuery } from './get-all-news.query';
import { NewsItemResponse } from './get-all-news.response';
import { News } from '@/features/news/news/news.entity';

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery> {

  async execute(query: GetAllNewsQuery): Promise<NewsItemResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const news = await News.find({skip : skip,take : take})

    return plainToInstance(NewsItemResponse, news, { excludeExtraneousValues: true });
  }
}