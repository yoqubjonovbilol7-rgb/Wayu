import { Query } from '@nestjs/cqrs';
import { GetOneUsefulLinkPublicResponse } from './get-one-useful-links.response';

export class GetOneUsefulLinkPublicQuery extends Query<GetOneUsefulLinkPublicResponse> {
  constructor(public readonly id: number) {
    super();
  }
}