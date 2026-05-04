import {Command} from "@nestjs/cqrs";
import {UpdateInstagramPostsResponse} from "./update-instagram-posts.response";

export class UpdateInstagramPostsCommand extends Command<UpdateInstagramPostsResponse>{
    constructor(public id: number, public link?: string, public imagePath?: string) {
        super();
    }
}