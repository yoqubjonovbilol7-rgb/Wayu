import { Query } from '@nestjs/cqrs';
import { GetAllUsefulLinksPublicResponse } from './get-all-useful-links.response';
import { GetAllUsefulLinksPublicFilters } from './get-all-useful-links.filters';

export class GetAllUsefulLinksPublicQuery extends Query<GetAllUsefulLinksPublicResponse> {
  constructor(public readonly filters: GetAllUsefulLinksPublicFilters) {
    super();
  }
}