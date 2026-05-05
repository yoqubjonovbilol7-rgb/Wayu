import {CreateBooksCommand} from './create-books.command';
import {CreateBooksResponse} from './create-books.response';
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Book} from "@/features/library/book/book.entity";

@CommandHandler(CreateBooksCommand)
export class CreateBooksHandler implements ICommandHandler<CreateBooksCommand> {

  async execute(command: CreateBooksCommand): Promise<CreateBooksResponse> {
    const newBook = Book.create({
      authorId: command.authorId,
      categoryId: command.categoryId,
      title: command.title,
      description: command.description,
      pages: command.pages,
      year: command.year,
      image: command.imagePath,
      file: command.filePath,
    } as Book);
    await Book.save(newBook);

    return plainToInstance(CreateBooksResponse, newBook, {excludeExtraneousValues: true});
  }
}