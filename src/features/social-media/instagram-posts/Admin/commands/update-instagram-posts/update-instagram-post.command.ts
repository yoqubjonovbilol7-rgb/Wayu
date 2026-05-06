import {Command} from "@nestjs/cqrs";
import {UpdateInstagramPostResponse} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.response";


export class UpdateInstagramPostCommand extends Command<UpdateInstagramPostResponse>{
    constructor(public id: number, public link?: string, public image?: string) {
        super();
    }
}