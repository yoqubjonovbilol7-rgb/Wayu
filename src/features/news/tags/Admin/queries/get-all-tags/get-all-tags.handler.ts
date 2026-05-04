import {GetAllTagsQuery} from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.query";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllTagsResponse} from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.response";
import {Tags} from "@/features/news/tags/tags.entity";


@QueryHandler(GetAllTagsQuery)
export class GetAllTagsAdminHandler implements IQueryHandler<GetAllTagsQuery> {
    async execute(query: GetAllTagsQuery): Promise<GetAllTagsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const tags = await Tags.find({skip: skip, take: take});
        return plainToInstance(GetAllTagsResponse, tags, {excludeExtraneousValues: true});
    }
}