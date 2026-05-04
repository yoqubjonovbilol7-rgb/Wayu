import {Query} from "@nestjs/cqrs";
import {GetOneNewsCategoryResponse} from "@/features/news/news-category/Public/queries/get-one-news-category/get-one-news-category.response";

export class GetOneTagsAdminQuery extends Query<GetOneNewsCategoryResponse>{
    constructor(public readonly id : number) {
        super();
    }
}