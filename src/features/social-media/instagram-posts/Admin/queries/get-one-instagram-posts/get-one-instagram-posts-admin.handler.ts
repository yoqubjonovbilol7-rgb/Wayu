import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {GetOneInstagramPostsAdminQuery} from "./get-one-instagram-posts-admin.query";
import {InstagramPosts} from "@/features/social-media/instagram-posts/instagramPosts.entity";
import {GetOneInstagramPostsAdminResponse} from "./get-one-instagram-posts-admin.response";

@QueryHandler(GetOneInstagramPostsAdminQuery)
export class GetOneInstagramPostsAdminHandler implements IQueryHandler<GetOneInstagramPostsAdminQuery> {

    async execute(query: GetOneInstagramPostsAdminQuery): Promise<GetOneInstagramPostsAdminResponse> {
        const instagramPosts = await InstagramPosts.findOne({where: { id: query.id }});
        if (!instagramPosts) {
            throw new NotFoundException('InstagramPosts not found');
        }

        return plainToInstance(GetOneInstagramPostsAdminResponse, instagramPosts, {excludeExtraneousValues: true});
    }
}