import {Query} from "@nestjs/cqrs";
import {GetAllSocialLinksResponse} from "@/features/info/social-links/Admin/queries/get-all-social-links/get-all-social-links.response";
import {GetAllSocialLinksFilters} from "@/features/info/social-links/Admin/queries/get-all-social-links/get-all-social-links.filters";

export class GetAllSocialLinksQuery extends Query<GetAllSocialLinksResponse[]>{
  constructor(public readonly filters : GetAllSocialLinksFilters) {
    super();
  }
}