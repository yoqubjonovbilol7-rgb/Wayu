import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {
    DeleteInstagramPostsCommand
} from "./delete-instagram-posts.command";
import {InstagramPosts} from "@/features/social-media/instagram-posts/instagramPosts.entity";
import * as fs from "fs";


@CommandHandler(DeleteInstagramPostsCommand)
export class DeleteInstagramPostsHandler implements ICommandHandler<DeleteInstagramPostsCommand> {
    async execute(cmd: DeleteInstagramPostsCommand): Promise<void> {
        const instagramPosts = await InstagramPosts.findOneBy({id: cmd.id});
        if (!instagramPosts)
            throw new NotFoundException("InstagramPosts not found");

        if (instagramPosts.image && fs.existsSync('.' + instagramPosts.image)) {
            fs.unlinkSync('.' + instagramPosts.image);
        }

        await InstagramPosts.remove(instagramPosts);
    }
}