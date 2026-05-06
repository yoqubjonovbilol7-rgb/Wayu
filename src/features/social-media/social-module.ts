import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {CreateInstagramPostHandler} from "@/features/social-media/instagram-posts/Admin/commands/create-instagram-posts/create-instagram-post.handler";
import {UpdateInstagramPostHandler} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.handler";
import {GetAllInstagramPostHandler} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.handler";
import {InstagramPosts} from "@/features/social-media/instagram-posts/instagramPosts.entity";
import {DeleteInstagramPostHandler} from "@/features/social-media/instagram-posts/Admin/commands/delete-instagram-posts/delete-instagram-post.handler";
import {GetOneInstagramPostHandler} from "@/features/social-media/instagram-posts/Admin/queries/get-one-instagram-post/get-one-instagram-post.handler";
import {InstagramPostsAdminController} from "@/features/social-media/instagram-posts/Admin/instagram-posts.admin.controller";


@Module({
    imports: [TypeOrmModule.forFeature([InstagramPosts])],
    controllers : [InstagramPostsAdminController],
    providers : [

        CreateInstagramPostHandler,
        UpdateInstagramPostHandler,
        GetAllInstagramPostHandler,
        DeleteInstagramPostHandler,
      GetOneInstagramPostHandler,


    ]
})


export class SocialModule {}