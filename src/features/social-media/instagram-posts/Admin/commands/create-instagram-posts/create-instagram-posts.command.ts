import {Command} from "@nestjs/cqrs";
import {CreateInstagramPostsResponse} from "./create-instagram-posts.response";


export class CreateInstagramPostsCommand extends Command<CreateInstagramPostsResponse> {
    constructor(public link: string, public imagePath: string) {
        super();
    }
}