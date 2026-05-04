import {plainToInstance} from "class-transformer";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {GetAllInstagramPostsQuery} from "./get-all-instagram-posts.query";
import {GetAllInstagramPostsResponse} from "./get-all-instagram-posts.response";
import {InstagramPosts} from "@/features/social-media/instagram-posts/instagramPosts.entity";


@QueryHandler(GetAllInstagramPostsQuery)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsQuery> {
    async execute(query: GetAllInstagramPostsQuery): Promise<GetAllInstagramPostsResponse> {
        const take = query.filters.limit ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const [data, total] = await InstagramPosts.findAndCount({skip, take});
        return plainToInstance(GetAllInstagramPostsResponse, {data, total}, {excludeExtraneousValues: true});
    }
}