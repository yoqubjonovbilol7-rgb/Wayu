import { Query } from '@nestjs/cqrs';
import { UsefulLinkPublicResponse } from './get-all-useful-links.response';
import { GetAllUsefulLinksPublicFilters } from './get-all-useful-links.filters';

export class GetAllUsefulLinksPublicQuery extends Query<UsefulLinkPublicResponse []> {
  constructor(public readonly filters: GetAllUsefulLinksPublicFilters) {
    super();
  }
}