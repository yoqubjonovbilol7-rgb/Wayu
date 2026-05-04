import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {Tags} from "@/features/news/tags/tags.entity";
import {GetOneTagsPublicQuery} from "@/features/news/tags/Public/queries/get-one-tags/get-one-tags-public.query";
import {GetOneTagsPublicResponse} from "@/features/news/tags/Public/queries/get-one-tags/get-one-tags-public.response";

@QueryHandler(GetOneTagsPublicQuery)
export class GetOneTagsPublicHandler implements IQueryHandler<GetOneTagsPublicQuery> {

    async execute(query: GetOneTagsPublicQuery): Promise<GetOneTagsPublicResponse> {
        const tags = await Tags.findOne({where: { id: query.id }});
        if (!tags) {
            throw new NotFoundException(`ID topilmadi`);
        }

        return plainToInstance(GetOneTagsPublicResponse, tags, {excludeExtraneousValues: true});
    }
}