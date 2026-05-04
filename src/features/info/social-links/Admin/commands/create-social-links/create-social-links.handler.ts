import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSocialLinksCommand } from '@/features/info/social-links/Admin/commands/create-social-links/create-social-links.command';
import { CreateSocialLinksResponse } from '@/features/info/social-links/Admin/commands/create-social-links/create-social-links.response';
import { SocialLinks } from '@/features/info/social-links/socialLinks.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateSocialLinksCommand)
export class CreateSocialLinksHandler implements ICommandHandler<CreateSocialLinksCommand> {
  async execute(
    command: CreateSocialLinksCommand,
  ): Promise<CreateSocialLinksResponse> {


    const socialLink = SocialLinks.create({
      title: command.title,
      icon: command.icon,
      link: command.link,
    });

    await SocialLinks.save(socialLink);

    return plainToInstance(CreateSocialLinksResponse, socialLink, { excludeExtraneousValues: true },);
  }
}