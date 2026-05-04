import {Query} from "@nestjs/cqrs";
import {
    GetAllBranchesResponse
} from "@/features/organization/branches/Admin/queries/get-all-branches/get-all-branches.response";
import {
    GetAllBranchesFilters
} from "@/features/organization/branches/Admin/queries/get-all-branches/get-all-branches.filters";

export class GetAllBranchesQuery extends Query<GetAllBranchesResponse[]>{
    constructor(public filters : GetAllBranchesFilters){
        super();
    }
}