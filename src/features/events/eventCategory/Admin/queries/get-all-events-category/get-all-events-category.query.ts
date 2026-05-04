import {Query} from "@nestjs/cqrs";
import {
    GetAllEventsCategoriesFilters
} from "@/features/events/eventCategory/Admin/queries/get-all-events-category/get-all-events-category.filters";
import {
    GetAllEventsCategoriesResponse
} from "@/features/events/eventCategory/Admin/queries/get-all-events-category/get-all-events-category.response";

export class GetAllEventsCategoriesQuery extends Query<GetAllEventsCategoriesResponse[]> {
    constructor(public readonly filters: GetAllEventsCategoriesFilters) {
        super();
    }
}