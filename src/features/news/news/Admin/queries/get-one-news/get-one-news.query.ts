import { Query } from '@nestjs/cqrs';
import { GetOneNewsResponse } from './get-one-news.response';

export class GetOneNewsQuery extends Query<GetOneNewsResponse> {
  constructor(public id: number) {
    super();
  }
}