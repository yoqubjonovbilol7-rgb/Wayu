import { Query } from '@nestjs/cqrs';
import { GetAllBranchesPublicResponse } from './get-all-branches.response';
import { GetAllBranchesPublicFilters } from './get-all-branches.filters';

export class GetAllBranchesPublicQuery extends Query<GetAllBranchesPublicResponse[]> {
  constructor(public readonly filters: GetAllBranchesPublicFilters) {
    super();
  }
}
