import {Query} from "@nestjs/cqrs";
import {GetAllTagsResponse} from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.response";
import {GetAllTagsFilters} from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.filters";

export class GetAllTagsQuery extends Query<GetAllTagsResponse[]> {
    constructor(public readonly filters: GetAllTagsFilters) {
        super();
    }
}