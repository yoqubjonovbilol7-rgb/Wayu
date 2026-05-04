import {Command} from "@nestjs/cqrs";
import {UpdateTagsResponse} from "@/features/news/tags/Admin/command/update-tags/update-tags.response";

export class UpdateTagsCommand extends Command<UpdateTagsResponse>{
    constructor(public id : number,public title :string) {
        super();
    }
}