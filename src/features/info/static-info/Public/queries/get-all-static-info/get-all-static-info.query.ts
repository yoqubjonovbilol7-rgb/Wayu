import { Query } from '@nestjs/cqrs';
import { GetAllStaticInfoPublicResponse } from './get-all-static-info.response';
import { GetAllStaticInfoPublicFilters } from './get-all-static-info.filters';

export class GetAllStaticInfoPublicQuery extends Query<GetAllStaticInfoPublicResponse> {
  constructor(public readonly filters: GetAllStaticInfoPublicFilters) {
    super();
  }
}