import { Query } from '@nestjs/cqrs';
import { GetOneStaticInfoPublicResponse } from './get-one-static-info.response';

export class GetOneStaticInfoPublicQuery extends Query<GetOneStaticInfoPublicResponse> {
  constructor(public readonly id: number) {
    super();
  }
}