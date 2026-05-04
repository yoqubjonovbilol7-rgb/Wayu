import { Query } from '@nestjs/cqrs';
import { GetAllSocialLinksPublicResponse } from './get-all-social-links.response';
import { GetAllSocialLinksPublicFilters } from './get-all-social-links.filters';

export class GetAllSocialLinksPublicQuery extends Query<GetAllSocialLinksPublicResponse> {
  constructor(public readonly filters: GetAllSocialLinksPublicFilters) {
    super();
  }
}