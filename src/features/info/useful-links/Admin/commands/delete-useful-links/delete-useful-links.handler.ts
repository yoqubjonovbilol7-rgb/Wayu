import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteUsefulLinksCommand} from "@/features/info/useful-links/Admin/commands/delete-useful-links/delete-useful-links.command";
import {UsefulLinks} from "@/features/info/useful-links/usefulLinks.entity";


@CommandHandler(DeleteUsefulLinksCommand)
export class DeleteUsefulLinksHandler implements ICommandHandler<DeleteUsefulLinksCommand>{
  async execute(cmd : DeleteUsefulLinksCommand) : Promise<void> {
    const usefulLinks = await UsefulLinks.findOneBy({id: cmd.id})

    if (!usefulLinks) {
      throw new NotFoundException('UsefulLinks not found')
    }

    await UsefulLinks.remove(usefulLinks)
  }
}