import { Command } from '@nestjs/cqrs';
import { CreateBooksResponse } from '@/features/library/book/Admin/commands/create-books/create-books.response';

export class CreateBooksCommand extends Command<CreateBooksResponse> {
  constructor(
    public authorId: number,
    public categoryId: number,
    public title: string,
    public pages: number,
    public year: number,
    public imagePath: Express.Multer.File,
    public filePath: Express.Multer.File,
    public description?: string,
  ) {
    super();
  }
}