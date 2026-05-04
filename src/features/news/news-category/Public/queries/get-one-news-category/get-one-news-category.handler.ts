import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {GetOneNewsCategoryQuery} from "@/features/news/news-category/Public/queries/get-one-news-category/get-one-news-category.query";
import { GetOneNewsCategoryResponse } from "@/features/news/news-category/Public/queries/get-one-news-category/get-one-news-category.response";
import { NewsCategories } from "@/features/news/news-category/newsCategories.entity";
import { plainToInstance } from "class-transformer";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetOneNewsCategoryQuery)
export class GetOneNewsCategoryPublicHandler implements IQueryHandler<GetOneNewsCategoryQuery> {

    async execute(query: GetOneNewsCategoryQuery): Promise<GetOneNewsCategoryResponse> {
        const category = await NewsCategories.findOne({where : query});
        if (!category) {
            throw new NotFoundException('id topilmadi');
        }

        return plainToInstance(GetOneNewsCategoryResponse, category, {excludeExtraneousValues: true});
    }
}