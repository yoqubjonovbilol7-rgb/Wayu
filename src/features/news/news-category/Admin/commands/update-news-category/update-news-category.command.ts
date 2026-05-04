
import {Command} from "@nestjs/cqrs";
import {UpdateNewsCategoryResponse} from "@/features/news/news-category/Admin/commands/update-news-category/update-news-category.response";

export class UpdateNewsCategoryCommand extends Command<UpdateNewsCategoryResponse>{
    constructor(public id : number, public title?: string, public imagePath?: string) {
        super();
    }
}