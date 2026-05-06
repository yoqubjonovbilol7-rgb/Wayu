import {CommandHandler, ICommandHandler,} from '@nestjs/cqrs';
import  fs from 'fs';
import { EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { InstagramPosts } from '@/features/social-media/instagram-posts/instagramPosts.entity';
;
import { UpdateInstagramPostResponse } from './update-instagram-post.response';
import {NotFoundException} from "@nestjs/common";
import {UpdateInstagramPostCommand} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.command";

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
    if (cmd.image) {
      if (post.image && fs.existsSync(post.image)) {
        fs.unlinkSync(post.image);
      }
      post.image = cmd.image;
    }
    const updated = await this.manager.save(post);
    return plainToInstance(UpdateInstagramPostResponse, updated, {excludeExtraneousValues: true,});
  }
}