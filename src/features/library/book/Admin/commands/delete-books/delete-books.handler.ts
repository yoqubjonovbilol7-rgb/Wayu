import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import { DeleteBooksCommand } from "./delete-books.command";
import {Book} from "@/features/library/book/book.entity";



@CommandHandler(DeleteBooksCommand)
export class DeleteBooksHandler implements ICommandHandler<DeleteBooksCommand> {
    async execute(cmd: DeleteBooksCommand): Promise<void> {
        const book = await Book.findOneBy({id: cmd.id});
        if (!book)
            throw new NotFoundException("Book not found");

        await Book.remove(book);
    }
}