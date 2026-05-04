import {Query} from "@nestjs/cqrs";
import {GetAllInstagramPostsResponse} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.response";
import {
    GetAllInstagramPostFilters
} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.filters";

export class GetAllInstagramPostQuery extends Query<GetAllInstagramPostsResponse[]>{
    constructor(public readonly filters: GetAllInstagramPostFilters) {
        super();
    }
}