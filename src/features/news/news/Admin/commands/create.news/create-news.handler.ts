import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '@/features/news/news-category/newsCategories.entity';
import { CreateNewsCommand } from './create-news.command';
import { CreateNewsResponse } from './create-news.response';
import { Countries } from '@/features/organization/countries/countries.entity';
import {News} from "@/features/news/news/news.entity";

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {


  async execute(cmd: CreateNewsCommand): Promise<CreateNewsResponse> {
    const categoryExists = await NewsCategories.existsBy({ id: cmd.categoryId });
    if (!categoryExists) {
      throw new NotFoundException('Category with given id not found');
    }

      const countryExists = await Countries.existsBy({ id: cmd.countryId });
      if (!countryExists) {
        throw new NotFoundException('Country with given id not found');
      }
    

    const newNews = await News.create({
      categoryId: cmd.categoryId,
      countryId: cmd.countryId,
      title: cmd.title,
      content: cmd.content,
      image : cmd.image.path,
      date: cmd.date,
    });

    return plainToInstance(CreateNewsResponse, newNews, { excludeExtraneousValues: true });
  }
}