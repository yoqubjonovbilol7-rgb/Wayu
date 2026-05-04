import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {GetOneNewsCategoryAdminQuery} from "@/features/news/news-category/Admin/queries/get-one-news-category/get-one-news-category-admin.query";
import {NewsCategories} from "@/features/news/news-category/newsCategories.entity";
import {GetOneNewsCategoryAdminResponse} from "@/features/news/news-category/Admin/queries/get-one-news-category/get-one-news-category-admin.response";

@QueryHandler(GetOneNewsCategoryAdminQuery)
export class GetOneNewsCategoryAdminHandler implements IQueryHandler<GetOneNewsCategoryAdminQuery> {

    async execute(query: GetOneNewsCategoryAdminQuery): Promise<GetOneNewsCategoryAdminResponse> {
        const category = await NewsCategories.findOne({where: { id: query.id }});
        if (!category) {
            throw new NotFoundException(`ID topilmadi`);
        }

        return plainToInstance(GetOneNewsCategoryAdminResponse, category, {excludeExtraneousValues: true});
    }
}