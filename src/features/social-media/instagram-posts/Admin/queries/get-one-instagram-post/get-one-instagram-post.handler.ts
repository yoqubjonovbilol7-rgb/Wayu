import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { GetOneInstagramPostQuery } from './get-one-instagram-post.query';
import { GetOneInstagramPostResponse } from './get-one-instagram-post.response';
import {InstagramPosts} from "@/features/social-media/instagram-posts/instagramPosts.entity";


@QueryHandler(GetOneInstagramPostQuery)
export class GetOneInstagramPostHandler implements IQueryHandler<GetOneInstagramPostQuery> {

  async execute(query: GetOneInstagramPostQuery): Promise<GetOneInstagramPostResponse> {
    const post = await InstagramPosts.findOne({ where: { id: query.id } });
    if (!post) {
      throw new NotFoundException('Instagram post not found');
    }
    return plainToInstance(GetOneInstagramPostResponse, post, {
      excludeExtraneousValues: true,
    });
  }
}
