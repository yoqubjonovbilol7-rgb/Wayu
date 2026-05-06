import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Representatives } from "@/features/organization/representatives/representatives.entity";

import { plainToInstance } from "class-transformer";
import { NotFoundException } from "@nestjs/common";
import {UpdateRepresentativeResponse} from "@/features/organization/representatives/Admin/commands/update-representatives/update-representatives.response";
import {UpdateRepresentativesCommand} from "@/features/organization/representatives/Admin/commands/update-representatives/update-representatives.command";

@CommandHandler(UpdateRepresentativesCommand)
export class UpdateRepresentativeHandler implements ICommandHandler<UpdateRepresentativesCommand> {

  async execute(cmd: UpdateRepresentativesCommand): Promise<UpdateRepresentativeResponse> {


    const representative = await Representatives.findOneBy({ id: cmd.id } as any);

    if (!representative) {
      throw new NotFoundException(`Vakil topilmadi (ID: ${cmd.id})`);
    }


    if (cmd.fullName) representative.fullName = cmd.fullName;
    if (cmd.email) representative.email = cmd.email;
    if (cmd.phoneNumber) representative.phoneNumber = cmd.phoneNumber;
    if (cmd.resume) representative.resume = cmd.resume;


    if (cmd.image && cmd.image.path) {
      representative.image = cmd.image.path;
    }


    const saved = await Representatives.save(representative);

    return plainToInstance(UpdateRepresentativeResponse, saved, {
      excludeExtraneousValues: true
    });
  }
}