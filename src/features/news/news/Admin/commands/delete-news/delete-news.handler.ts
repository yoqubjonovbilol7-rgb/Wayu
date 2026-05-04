import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { DeleteNewsCommand } from './delete-news.command';
import {News} from "@/features/news/news/news.entity";

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {


  async execute(cmd: DeleteNewsCommand): Promise<void> {
    const news = await News.findOne({ where: { id: cmd.id } });
    if (!news) {
      throw new NotFoundException('News not found');
    }

    await News.remove(news);
  }
}