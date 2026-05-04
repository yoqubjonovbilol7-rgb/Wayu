import {Query} from "@nestjs/cqrs";
import {GetAllNewsFilters} from "@/features/news/news/Public/queries/get-all-news/get-all-news.filters";
import {GetAllNewsResponse} from "@/features/news/news/Public/queries/get-all-news/get-all-news.response";

export class GetAllNewsQuery extends Query<GetAllNewsResponse[]> {
    constructor(public readonly filters: GetAllNewsFilters) {
        super();
    }
}