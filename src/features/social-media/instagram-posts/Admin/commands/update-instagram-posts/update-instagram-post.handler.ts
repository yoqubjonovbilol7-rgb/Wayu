import {CommandHandler, ICommandHandler,} from '@nestjs/cqrs';
import  fs from 'fs';
import { EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { InstagramPosts } from '@/features/social-media/instagram-posts/instagramPosts.entity';
import { UpdateInstagramPostCommand } from './update-instagram-post.command';
import { UpdateInstagramPostResponse } from './update-instagram-post.response';
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateInstagramPostCommand)
export class UpdateInstagramPostHandler implements ICommandHandler<UpdateInstagramPostCommand> {
  constructor(private readonly manager: EntityManager) {}

  async execute(cmd: UpdateInstagramPostCommand,): Promise<UpdateInstagramPostResponse> {
    const post = await this.manager.findOne(InstagramPosts, { where: { id: cmd.id } });
    if (!post) {
      throw new NotFoundException('Instagram post not found');
    }
    if (cmd.link) {
      post.link = cmd.link;
    }
    if (cmd.imagePath) {
      if (post.image && fs.existsSync(post.image)) {
        fs.unlinkSync(post.image);
      }
      post.image = cmd.imagePath;
    }
    const updated = await this.manager.save(post);
    return plainToInstance(UpdateInstagramPostResponse, updated, {excludeExtraneousValues: true,});
  }
}