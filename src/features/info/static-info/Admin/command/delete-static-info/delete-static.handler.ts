import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';
import {DeleteStaticCommand} from "@/features/info/static-info/Admin/command/delete-static-info/delete-static.command";

@CommandHandler(DeleteStaticCommand)
export class DeleteStaticInfoHandler
  implements ICommandHandler<DeleteStaticCommand>
{
  async execute(cmd: DeleteStaticCommand): Promise<void> {
    const staticInfo = await StaticInfo.findOneBy({ id: cmd.id });

    if (!staticInfo) {
      throw new NotFoundException('StaticInfo not found');
    }

    await StaticInfo.remove(staticInfo);
  }
}