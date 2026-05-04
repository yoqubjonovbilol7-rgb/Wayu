import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {
    DeleteBooksCommand
} from "./delete-books.command";
import {Book} from "@/features/library/book/book.entity";
import * as fs from "fs";


@CommandHandler(DeleteBooksCommand)
export class DeleteBooksHandler implements ICommandHandler<DeleteBooksCommand> {
    async execute(cmd: DeleteBooksCommand): Promise<void> {
        const book = await Book.findOneBy({id: cmd.id});
        if (!book)
            throw new NotFoundException("Book not found");

        if (book.image && fs.existsSync('.' + book.image)) {
            fs.unlinkSync('.' + book.image);
        }
        if (book.file && fs.existsSync('.' + book.file)) {
            fs.unlinkSync('.' + book.file);
        }

        await Book.remove(book);
    }
}