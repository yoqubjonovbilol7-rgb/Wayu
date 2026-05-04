import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllTagsResponse} from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.response";
import {Tags} from "@/features/news/tags/tags.entity";
import {GetAllTagsPublicQuery} from "@/features/news/tags/Public/queries/get-all-tags/get-all-tags.query";


@QueryHandler(GetAllTagsPublicQuery)
export class GetAllTagsPublicHandler implements IQueryHandler<GetAllTagsPublicQuery> {
    async execute(query: GetAllTagsPublicQuery): Promise<GetAllTagsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const tags = await Tags.find({skip: skip, take: take});
        return plainToInstance(GetAllTagsResponse, tags, {excludeExtraneousValues: true});
    }
}