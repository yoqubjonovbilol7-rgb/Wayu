import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import * as fs from "fs";


import { DeleteApplicationsCommand } from "./delete-applications.command";
import {Applications} from "@/features/careers/applications/applications.entity";

@CommandHandler(DeleteApplicationsCommand)
export class DeleteApplicationsHandler implements ICommandHandler<DeleteApplicationsCommand> {

  async execute(cmd: DeleteApplicationsCommand): Promise<void> {

    const application = await Applications.findOne({where: { id: cmd.id },});

    if (!application) {
      throw new NotFoundException("Application not found");
    }

    await Applications.remove(application);

  }
}