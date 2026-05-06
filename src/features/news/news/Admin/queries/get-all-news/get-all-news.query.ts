import { Query } from '@nestjs/cqrs';
import {NewsItemResponse } from './get-all-news.response';
import { GetAllNewsFilters } from './get-all-news.filters';

export class GetAllNewsQuery extends Query<NewsItemResponse[]> {
  constructor(public readonly filters: GetAllNewsFilters) {
    super();
  }
}