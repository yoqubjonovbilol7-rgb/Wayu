import {Command} from "@nestjs/cqrs";
import {
    UpdateInstagramPostResponse
} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.response";

export class UpdateInstagramPostCommand extends Command<UpdateInstagramPostResponse>{
    constructor(
        public readonly id: number,
        public readonly imagePath?: string,
        public readonly link?: string) {
        super();
    }
}