import { Query } from '@nestjs/cqrs';
import { GetOneApplicationPublicResponse } from './get-one-applications.response';

export class GetOneApplicationPublicQuery extends Query<GetOneApplicationPublicResponse> {
  constructor(public readonly id: number) {
    super();
  }
}