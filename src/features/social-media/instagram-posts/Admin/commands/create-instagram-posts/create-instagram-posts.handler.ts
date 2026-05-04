import {CreateInstagramPostsCommand} from './create-instagram-posts.command';
import {CreateInstagramPostsResponse} from './create-instagram-posts.response';
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InstagramPosts} from "@/features/social-media/instagram-posts/instagramPosts.entity";

@CommandHandler(CreateInstagramPostsCommand)
export class CreateInstagramPostsHandler implements ICommandHandler<CreateInstagramPostsCommand> {

    async execute(command: CreateInstagramPostsCommand): Promise<CreateInstagramPostsResponse> {
        const newInstagramPosts = InstagramPosts.create({link: command.link, image: command.imagePath} as InstagramPosts);
        await InstagramPosts.save(newInstagramPosts);

        return plainToInstance(CreateInstagramPostsResponse, newInstagramPosts, {excludeExtraneousValues: true});
    }
}