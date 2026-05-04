import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {News} from "@/features/news/news/news.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {
    DeleteNewsCategoryCommand
} from "@/features/news/news-category/Admin/commands/delete-news-category/delete-news-category.command";
import {NewsCategories} from "@/features/news/news-category/newsCategories.entity";
import {DeleteTagsCommand} from "@/features/news/tags/Admin/command/delete-tags/delete-tags.command";
import {Tags} from "@/features/news/tags/tags.entity";
import {NewsTag} from "@/features/news/newsTag/NewsTag.entity";


@CommandHandler(DeleteTagsCommand)
export class DeleteTagsHandler implements ICommandHandler<DeleteTagsCommand> {
    async execute(cmd: DeleteTagsCommand): Promise<void> {
        const tags = await Tags.findOneBy({id: cmd.id});
        if (!tags)
            throw new NotFoundException("Tags with given id not found");

        const hasAnyAttachedNews = await NewsTag.existsBy({tagId: cmd.id});
        if (hasAnyAttachedNews)
            throw new BadRequestException("Tags has attached NewsTags, move or delete them first");

        await Tags.remove(tags);
    }
}