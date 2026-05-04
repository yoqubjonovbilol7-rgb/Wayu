import {Command} from "@nestjs/cqrs";
import {CreateTagsResponse} from "@/features/news/tags/Admin/command/create-tags/create-tags.response";

export class CreateTagsCommand extends Command<CreateTagsResponse> {
    constructor(public title : string) {
        super();
    }
}