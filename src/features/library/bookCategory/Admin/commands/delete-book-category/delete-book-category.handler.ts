import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteBookCategoryCommand} from "@/features/library/bookCategory/Admin/commands/delete-book-category/delete-book-category.command";
import {BookCategories} from "@/features/library/bookCategory/bookCategories.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {Book} from "@/features/library/book/book.entity";


@CommandHandler(DeleteBookCategoryCommand)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryCommand> {
    async execute(cmd : DeleteBookCategoryCommand) :Promise <void> {
        const bookCategory = await BookCategories.findOneBy({id : cmd.id})
        if(!bookCategory) {
            throw new NotFoundException('BookCategory with given id not found')
        }

        const hasAnyAttachedBook = await Book.existsBy({categoryId : cmd.id})
        if(hasAnyAttachedBook) {
            throw new BadRequestException('Category has attached Book, move or delete them first')
        }

        await BookCategories.remove(bookCategory)
    }
}