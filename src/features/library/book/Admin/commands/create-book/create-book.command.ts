import { Command } from "@nestjs/cqrs";
import { CreateBookResponse } from "@/features/library/book/Admin/commands/create-book/create-book.response";

export class CreateBookCommand extends Command<CreateBookResponse> {
    constructor(
        public authorId: number,
        public categoryId: number,
        public title: string,
        public image: Express.Multer.File,
        public file: Express.Multer.File,
        public pages: number,
        public year: number,
        public description?: string,
    ) {
        super();
    }
}