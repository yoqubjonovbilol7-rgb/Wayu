import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { NewsCategories } from "@/features/news/news-category/newsCategories.entity";
import {
    UpdateNewsCategoryCommand
} from "@/features/news/news-category/Admin/commands/update-news-category/update-news-category.command";
import {
    UpdateNewsCategoryResponse
} from "@/features/news/news-category/Admin/commands/update-news-category/update-news-category.response";

@CommandHandler(UpdateNewsCategoryCommand)
export class UpdateNewsCategoryHandler implements ICommandHandler<UpdateNewsCategoryCommand> {

    async execute(command: UpdateNewsCategoryCommand): Promise<UpdateNewsCategoryResponse> {
        const category = await NewsCategories.findOne({where: {id : command.id}});
        if (!category) {
            throw new NotFoundException('id topilmadi');
        }
        if (command.title) {
            category.title = command.title;
        }

        const updatedCategory = await category.save();
        return plainToInstance(UpdateNewsCategoryResponse, updatedCategory, {excludeExtraneousValues: true});
    }
}