import {Query} from "@nestjs/cqrs";
import {GetOneBranchResponse} from "@/features/organization/branches/Admin/queries/get-one-branches/get-one-branches.response";

export class GetOneBranchesQuery extends Query<GetOneBranchResponse>{
  constructor(public id : number) {
    super();
  }
}