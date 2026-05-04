import { Query } from '@nestjs/cqrs';
import { GetOneSocialLinkPublicResponse } from './get-one-social-links.response';

export class GetOneSocialLinkPublicQuery extends Query<GetOneSocialLinkPublicResponse> {
  constructor(public readonly id: number) {
    super();
  }
}