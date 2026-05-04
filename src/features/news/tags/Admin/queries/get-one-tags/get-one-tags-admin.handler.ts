import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {GetOneTagsAdminQuery} from "@/features/news/tags/Admin/queries/get-one-tags/get-one-tags-admin.query";
import {GetOneTagsAdminResponse} from "@/features/news/tags/Admin/queries/get-one-tags/get-one-tags-admin.response";
import {Tags} from "@/features/news/tags/tags.entity";

@QueryHandler(GetOneTagsAdminQuery)
export class GetOneTagsAdminHandler implements IQueryHandler<GetOneTagsAdminQuery> {

    async execute(query: GetOneTagsAdminQuery): Promise<GetOneTagsAdminResponse> {
        const tags = await Tags.findOne({where: { id: query.id }});
        if (!tags) {
            throw new NotFoundException(`ID topilmadi`);
        }

        return plainToInstance(GetOneTagsAdminResponse, tags, {excludeExtraneousValues: true});
    }
}