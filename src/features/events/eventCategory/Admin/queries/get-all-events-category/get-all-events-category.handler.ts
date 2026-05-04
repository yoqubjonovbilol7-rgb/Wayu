import {plainToInstance} from "class-transformer";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {GetAllEventsCategoriesQuery} from "@/features/events/eventCategory/Admin/queries/get-all-events-category/get-all-events-category.query";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.response";
import {EventCategories} from "@/features/events/eventCategory/eventCategories.entity";

@QueryHandler(GetAllEventsCategoriesQuery)
export class GetAllEventsCategoriesHandler implements IQueryHandler<GetAllEventsCategoriesQuery> {
    async execute(query: GetAllEventsCategoriesQuery): Promise<GetAllNewsCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const categories = await EventCategories.find({skip: skip, take: take});
        return plainToInstance(GetAllNewsCategoriesResponse, categories, {excludeExtraneousValues: true});
    }
}