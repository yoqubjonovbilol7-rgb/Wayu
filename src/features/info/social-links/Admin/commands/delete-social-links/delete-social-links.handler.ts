import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteSocialLinksCommand} from "@/features/info/social-links/Admin/commands/delete-social-links/delete-social-links.command";
import {SocialLinks} from "@/features/info/social-links/socialLinks.entity";
import {NotFoundException} from "@nestjs/common";


@CommandHandler(DeleteSocialLinksCommand)
export class DeleteSocialLinksHandler implements ICommandHandler<DeleteSocialLinksCommand>{
  async execute(cmd : DeleteSocialLinksCommand) : Promise<void>{
    const socialLinks = await SocialLinks.findOneBy({id : cmd.id})

    if(!socialLinks){
      throw new NotFoundException('socialLinks not found')
    }

    await SocialLinks.remove(socialLinks)
  }
}