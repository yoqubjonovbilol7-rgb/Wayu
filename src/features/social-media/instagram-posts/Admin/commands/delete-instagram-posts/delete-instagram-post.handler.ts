import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteInstagramPostCommand } from "./delete-instagram-post.command";
import { NotFoundException } from "@nestjs/common";
import { InstagramPosts } from "@/features/social-media/instagram-posts/instagramPosts.entity";

@CommandHandler(DeleteInstagramPostCommand)
export class DeleteInstagramPostHandler implements ICommandHandler<DeleteInstagramPostCommand> {
  async execute(command: DeleteInstagramPostCommand): Promise<void> {
    const post = await InstagramPosts.findOne({
      where: { id: command.id },
    });

    if (!post) {
      throw new NotFoundException("Post topilmadi");
    }

    await InstagramPosts.remove(post);
  }
}