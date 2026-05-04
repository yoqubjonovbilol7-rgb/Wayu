import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { CreateInstagramPostCommand } from './create-instagram-post.command';
import { CreateInstagramPostResponse } from './create-instagram-post.response';
import { InstagramPosts } from '@/features/social-media/instagram-posts/instagramPosts.entity';

@CommandHandler(CreateInstagramPostCommand)
export class CreateInstagramPostHandler implements ICommandHandler<CreateInstagramPostCommand> {
    async execute(cmd: CreateInstagramPostCommand,): Promise<CreateInstagramPostResponse> {

        const newPost = InstagramPosts.create({image: cmd.image.path, link: cmd.link,} as InstagramPosts);
        await InstagramPosts.save(newPost);
        return plainToInstance(CreateInstagramPostResponse, newPost, {excludeExtraneousValues: true,});
    }
}