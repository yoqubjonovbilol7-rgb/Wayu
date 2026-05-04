import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {UsefulLinks} from "@/features/info/useful-links/usefulLinks.entity";
import {CreateUsefulLinksCommand} from "@/features/info/useful-links/Admin/commands/create-useful-links/create-useful-links.command";
import {CreateUsefulLinksResponse} from "@/features/info/useful-links/Admin/commands/create-useful-links/create-useful-links.response";

@CommandHandler(CreateUsefulLinksCommand)
export class CreateUsefulLinksHandler implements ICommandHandler<CreateUsefulLinksCommand> {
  async execute(command: CreateUsefulLinksCommand,): Promise<CreateUsefulLinksResponse> {


    const usefulLink = UsefulLinks.create({
      title: command.title,
      icon: command.icon,
      link: command.link,
    });

    await UsefulLinks.save(usefulLink);

    return plainToInstance(CreateUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true },);
  }
}