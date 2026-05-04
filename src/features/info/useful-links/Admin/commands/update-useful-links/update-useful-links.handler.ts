import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UpdateUsefulLinksCommand } from './update-useful-links.command';
import { UpdateUsefulLinksResponse } from './update-useful-links.response';
import { UsefulLinks } from '@/features/info/useful-links/usefulLinks.entity';

@CommandHandler(UpdateUsefulLinksCommand)
export class UpdateUsefulLinksHandler implements ICommandHandler<UpdateUsefulLinksCommand> {
  async execute(command: UpdateUsefulLinksCommand): Promise<UpdateUsefulLinksResponse> {

    const usefulLink = await UsefulLinks.findOne({
      where: { id: command.id },
    });

    if (!usefulLink) {
      throw new NotFoundException('Useful link not found');
    }

    if (command.title) {
      usefulLink.title = command.title;
    }

    if (command.icon) {
      usefulLink.icon = command.icon;
    }

    if (command.link) {
      usefulLink.link = command.link;
    }

    await UsefulLinks.save(usefulLink);

    return plainToInstance(UpdateUsefulLinksResponse, usefulLink, {
      excludeExtraneousValues: true,
    });
  }
}