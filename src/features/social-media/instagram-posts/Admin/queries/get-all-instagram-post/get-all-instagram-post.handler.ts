import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllInstagramPostQuery} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.query";
import {GetAllInstagramPostsResponse} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.response";
import {InstagramPosts} from "@/features/social-media/instagram-posts/instagramPosts.entity";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetAllInstagramPostQuery)
export class GetAllInstagramPostHandler implements IQueryHandler<GetAllInstagramPostQuery>{
    async execute(query : GetAllInstagramPostQuery) : Promise<GetAllInstagramPostsResponse[]>{
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const post = await InstagramPosts.find({skip : skip,take : take});

        return plainToInstance(GetAllInstagramPostsResponse,post,{excludeExtraneousValues : true})
    }
}