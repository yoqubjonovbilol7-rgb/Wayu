import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UpdateSocialLinksCommand } from './update-social-links.command';
import { CreateSocialLinksResponse } from '../create-social-links/create-social-links.response';
import { SocialLinks } from '@/features/info/social-links/socialLinks.entity';

@CommandHandler(UpdateSocialLinksCommand)
export class UpdateSocialLinksHandler implements ICommandHandler<UpdateSocialLinksCommand> {
  async execute(command: UpdateSocialLinksCommand,): Promise<CreateSocialLinksResponse> {


    const socialLink = await SocialLinks.findOne({where :{id: command.id}});

    if (!socialLink) {
      throw new NotFoundException('Social link not found');
    }

    if (command.title) {
      socialLink.title = command.title;
    }

    if (command.icon) {
      socialLink.icon = command.icon;
    }

    if (command.link) {
      socialLink.link = command.link;
    }


    await SocialLinks.save(socialLink);


    return plainToInstance(CreateSocialLinksResponse, socialLink, {excludeExtraneousValues: true,});
  }
}