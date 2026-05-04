import { Query } from '@nestjs/cqrs';
import { GetOneBranchPublicResponse } from './get-one-branches.response';

export class GetOneBranchPublicQuery extends Query<GetOneBranchPublicResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
