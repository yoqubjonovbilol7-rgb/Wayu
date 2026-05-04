import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Book } from "@/features/library/book/book.entity";
import {
    UpdateBooksCommand
} from "./update-books.command";
import {
    UpdateBooksResponse
} from "./update-books.response";
import * as fs from "fs";

@CommandHandler(UpdateBooksCommand)
export class UpdateBooksHandler implements ICommandHandler<UpdateBooksCommand> {

    async execute(command: UpdateBooksCommand): Promise<UpdateBooksResponse> {
        const book = await Book.findOne({where: {id: command.id}});
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        if (command.authorId !== undefined) {
            book.authorId = command.authorId;
        }
        if (command.categoryId !== undefined) {
            book.categoryId = command.categoryId;
        }
        if (command.title !== undefined) {
            book.title = command.title;
        }
        if (command.description !== undefined) {
            book.description = command.description;
        }
        if (command.pages !== undefined) {
            book.pages = command.pages;
        }
        if (command.year !== undefined) {
            book.year = command.year;
        }
        if (command.imagePath !== undefined) {
            if (book.image && fs.existsSync('.' + book.image)) {
                fs.unlinkSync('.' + book.image);
            }
            book.image = command.imagePath;
        }
        if (command.filePath !== undefined) {
            if (book.file && fs.existsSync('.' + book.file)) {
                fs.unlinkSync('.' + book.file);
            }
            book.file = command.filePath;
        }

        const updatedBook = await book.save();
        return plainToInstance(UpdateBooksResponse, updatedBook, {excludeExtraneousValues: true});
    }
}