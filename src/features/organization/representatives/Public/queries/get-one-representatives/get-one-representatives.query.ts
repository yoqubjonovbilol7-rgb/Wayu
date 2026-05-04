import { Query } from '@nestjs/cqrs';
import { GetOneRepresentativePublicResponse } from './get-one-representatives.response';

export class GetOneRepresentativePublicQuery extends Query<GetOneRepresentativePublicResponse> {
  constructor(public readonly id: number) {
    super();
  }
}