import {Query} from "@nestjs/cqrs";
import {
    GetOneBookCategoryResponse
} from "@/features/library/bookCategory/Admin/queries/get-one-book-category/get-one-book-category.response";

export class GetOneBookCategoryQuery extends Query<GetOneBookCategoryResponse> {
    constructor(public readonly id : number) {
        super();
    }
}