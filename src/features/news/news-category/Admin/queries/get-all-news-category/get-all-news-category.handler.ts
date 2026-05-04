import {plainToInstance} from "class-transformer";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {GetAllNewsCategoriesQuery} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.query";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.response";
import {NewsCategories} from "@/features/news/news-category/newsCategories.entity";


@QueryHandler(GetAllNewsCategoriesQuery)
export class GetAllNewsCategoriesHandler implements IQueryHandler<GetAllNewsCategoriesQuery> {
    async execute(query: GetAllNewsCategoriesQuery): Promise<GetAllNewsCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const categories = await NewsCategories.find({skip: skip, take: take});
        return plainToInstance(GetAllNewsCategoriesResponse, categories, {excludeExtraneousValues: true});
    }
}