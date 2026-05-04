import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {News} from "@/features/news/news/news.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {
    DeleteNewsCategoryCommand
} from "@/features/news/news-category/Admin/commands/delete-news-category/delete-news-category.command";
import {NewsCategories} from "@/features/news/news-category/newsCategories.entity";


@CommandHandler(DeleteNewsCategoryCommand)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommand> {
    async execute(cmd: DeleteNewsCategoryCommand): Promise<void> {
        const category = await NewsCategories.findOneBy({id: cmd.id});
        if (!category)
            throw new NotFoundException("Category with given id not found");

        const hasAnyAttachedNews = await News.existsBy({categoryId: cmd.id});
        if (hasAnyAttachedNews)
            throw new BadRequestException("Category has attached News, move or delete them first");

        await NewsCategories.remove(category);
    }
}