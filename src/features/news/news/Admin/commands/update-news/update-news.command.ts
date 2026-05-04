import { Command } from '@nestjs/cqrs';
import { UpdateNewsResponse } from './update-news.response';

export class UpdateNewsCommand extends Command<UpdateNewsResponse> {
  constructor(
    public id: number,
    public categoryId?: number,
    public title?: string,
    public content?: string,
    public image?: Express.Multer.File,
    public date?: Date,
    public countryId?: number,
  ) {
    super();
  }
}