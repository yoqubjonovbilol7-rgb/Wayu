import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteAuthorsCommand} from "@/features/library/authors/Admin/commands/delete-authors/delete-authors.command";
import {Author} from "@/features/library/authors/author.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {Book} from "@/features/library/book/book.entity";


@CommandHandler(DeleteAuthorsCommand)
export class DeleteAuthorsHandler implements ICommandHandler<DeleteAuthorsCommand> {
    async execute(cmd : DeleteAuthorsCommand) :Promise<void> {
        const authors = await Author.findOneBy({id : cmd.id})
        if (!authors) {
            throw new NotFoundException('Authors with given id not found')
        }

        const hasAnyAttachedBook = await Book.existsBy({categoryId : cmd.id})
        if (hasAnyAttachedBook) {
            throw new BadRequestException('Category has attached Book, move or delete them first')
        }

        await Author.remove(authors)
    }
}