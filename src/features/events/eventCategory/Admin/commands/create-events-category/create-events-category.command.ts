import {Command} from "@nestjs/cqrs";
import {CreateNewsCategoryResponse} from "@/features/news/news-category/Admin/commands/create-news-category/create-news-category.response";


export class CreateEventsCategoryCommand extends Command<CreateNewsCategoryResponse> {
    constructor(public title : string) {
        super();
    }
}