import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { InstagramPosts } from "@/features/social-media/instagram-posts/instagramPosts.entity";
import {
    UpdateInstagramPostsCommand
} from "./update-instagram-posts.command";
import {
    UpdateInstagramPostsResponse
} from "./update-instagram-posts.response";
import * as fs from "fs";

@CommandHandler(UpdateInstagramPostsCommand)
export class UpdateInstagramPostsHandler implements ICommandHandler<UpdateInstagramPostsCommand> {

    async execute(command: UpdateInstagramPostsCommand): Promise<UpdateInstagramPostsResponse> {
        const instagramPosts = await InstagramPosts.findOne({where: {id: command.id}});
        if (!instagramPosts) {
            throw new NotFoundException('InstagramPosts not found');
        }
        if (command.link !== undefined) {
            instagramPosts.link = command.link;
        }
        if (command.imagePath !== undefined) {
            if (instagramPosts.image && fs.existsSync('.' + instagramPosts.image)) {
                fs.unlinkSync('.' + instagramPosts.image);
            }
            instagramPosts.image = command.imagePath;
        }

        const updatedInstagramPosts = await instagramPosts.save();
        return plainToInstance(UpdateInstagramPostsResponse, updatedInstagramPosts, {excludeExtraneousValues: true});
    }
}