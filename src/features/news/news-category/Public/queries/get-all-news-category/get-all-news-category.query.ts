import {Query} from "@nestjs/cqrs";
import {GetAllNewsCategoriesFilters} from "@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.filters";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.response";

export class GetAllNewsCategoriesPublicQuery extends Query<GetAllNewsCategoriesResponse[]> {
    constructor(public readonly filters: GetAllNewsCategoriesFilters) {
        super();
    }
}