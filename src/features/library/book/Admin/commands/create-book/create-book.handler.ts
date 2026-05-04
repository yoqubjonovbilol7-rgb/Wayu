import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBookResponse } from "@/features/library/book/Admin/commands/create-book/create-book.response";
import { CreateBookCommand } from "@/features/library/book/Admin/commands/create-book/create-book.command";
import {Book} from "@/features/library/book/book.entity";
import {plainToInstance} from "class-transformer";


@CommandHandler(CreateBookCommand)
export class CreateBookHandler
    implements ICommandHandler<CreateBookCommand>
{
    async execute(cmd: CreateBookCommand): Promise<CreateBookResponse> {


        const book = Book.create({
            authorId: cmd.authorId,
            categoryId: cmd.categoryId,
            title: cmd.title,
            image: cmd.image.path,
            file: cmd.file.path,
            pages: cmd.pages,
            year: cmd.year,
            description: cmd.description,
        } as Book);

        await Book.save(book);

        return plainToInstance(CreateBookResponse,book,{excludeExtraneousValues : true})
    }
}