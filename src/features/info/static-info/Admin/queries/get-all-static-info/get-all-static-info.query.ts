import {Query} from "@nestjs/cqrs";
import {GetAllStaticInfoFilters} from "@/features/info/static-info/Admin/queries/get-all-static-info/get-all-static-info.filters";
import {GetAllStaticInfoResponse} from "@/features/info/static-info/Admin/queries/get-all-static-info/get-all-static-info.response";

export class GetAllStaticInfoQuery extends Query<GetAllStaticInfoResponse[]> {
  constructor(public readonly filters : GetAllStaticInfoFilters) {
    super();
  }
}