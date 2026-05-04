import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '@/features/news/news-category/newsCategories.entity';
import { UpdateNewsCommand } from './update-news.command';
import { UpdateNewsResponse } from './update-news.response';
import { Countries } from '@/features/organization/countries/countries.entity';
import {News} from "@/features/news/news/news.entity";

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {


  async execute(cmd: UpdateNewsCommand): Promise<UpdateNewsResponse> {
    const news = await News.findOne({ where: { id: cmd.id } });
    if (!news) {
      throw new NotFoundException('News not found');
    }

    if (cmd.categoryId) {
      const categoryExists = await NewsCategories.existsBy({ id: cmd.categoryId });
      if (!categoryExists) {
        throw new NotFoundException('Category with given id not found');
      }
    }

    if (cmd.countryId) {
      const countryExists = await Countries.existsBy({ id: cmd.countryId });
      if (!countryExists) {
        throw new NotFoundException('Country with given id not found');
      }
    }

    const updatedNews = await News.update(cmd.id, {
      categoryId: cmd.categoryId,
      countryId: cmd.countryId,
      title: cmd.title,
      content: cmd.content,
      image: cmd.image?.path,
      date: cmd.date,
    });

    if (!updatedNews) {
      throw new NotFoundException('News not found');
    }

    return plainToInstance(UpdateNewsResponse, updatedNews, { excludeExtraneousValues: true });
  }
}