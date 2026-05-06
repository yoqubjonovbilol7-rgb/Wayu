import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import * as fs from "fs";

import { Book } from "@/features/library/book/book.entity";
import { UpdateBooksCommand } from "./update-books.command";
import { UpdateBooksResponse } from "./update-books.response";

@CommandHandler(UpdateBooksCommand)
export class UpdateBooksHandler
  implements ICommandHandler<UpdateBooksCommand>
{
  async execute(command: UpdateBooksCommand): Promise<UpdateBooksResponse> {
    const book = await Book.findOne({ where: { id: command.id } });

    if (!book) {
      throw new NotFoundException("Book not found");
    }


    if (command.authorId)
      book.authorId = command.authorId;
    if (command.categoryId)
      book.categoryId = command.categoryId;
    if (command.title)
      book.title = command.title;
    if (command.description)
      book.description = command.description;
    if (command.pages)
      book.pages = command.pages;
    if (command.year)
      book.year = command.year;

    if (command.imagePath) {
      if (book.image && fs.existsSync(book.image)) {
        fs.unlinkSync(book.image);
      }

      book.image = command.imagePath.path;
    }

    if (command.filePath) {
      if (book.file && fs.existsSync(book.file)) {
        fs.unlinkSync(book.file);
      }

      book.file = command.filePath.path;
    }

    const updatedBook = await book.save();

    return plainToInstance(UpdateBooksResponse, updatedBook, {
      excludeExtraneousValues: true,
    });
  }
}