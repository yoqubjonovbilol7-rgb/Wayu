import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllNewsCategoriesPublicQuery,} from "@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.query";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.response";
import {NewsCategories} from "@/features/news/news-category/newsCategories.entity";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetAllNewsCategoriesPublicQuery)
export class GetAllNewsCategoriesPublicHandler implements IQueryHandler<GetAllNewsCategoriesPublicQuery> {
    async execute(query: GetAllNewsCategoriesPublicQuery): Promise<GetAllNewsCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const categories = await NewsCategories.find({skip: skip, take: take});
        return plainToInstance(GetAllNewsCategoriesResponse, categories, {excludeExtraneousValues: true});
    }
}