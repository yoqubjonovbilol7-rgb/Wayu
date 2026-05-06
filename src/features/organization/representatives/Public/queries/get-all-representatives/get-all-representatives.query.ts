import { Query } from '@nestjs/cqrs';
import { GetAllRepresentativesPublicResponse } from './get-all-representatives.response';
import { GetAllRepresentativesPublicFilters } from './get-all-representatives.filters';

export class GetAllRepresentativesPublicQuery extends Query<GetAllRepresentativesPublicResponse[]> {
  constructor(public readonly filters: GetAllRepresentativesPublicFilters) {
    super();
  }
}