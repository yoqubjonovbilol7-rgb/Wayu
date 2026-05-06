import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import fs from "fs";


import { UpdateApplicationsCommand } from "./update-applications.command";

import {Applications} from "@/features/careers/applications/applications.entity";
import {UpdateApplicationsResponse} from "@/features/careers/applications/Admin/commands/update-applications/update-applications.response";

@CommandHandler(UpdateApplicationsCommand)
export class UpdateApplicationsHandler implements ICommandHandler<UpdateApplicationsCommand> {
  async execute(cmd: UpdateApplicationsCommand): Promise<UpdateApplicationsResponse> {

    const application = await Applications.findOne({where: { id: cmd.id },});

    if (!application) {
      throw new NotFoundException("Application not found");
    }

    if (cmd.fullName)
      application.fullName = cmd.fullName;
    if (cmd.phoneNumber)
      application.phoneNumber = cmd.phoneNumber;
    if (cmd.email)
      application.email = cmd.email;
    if (cmd.vacancyId)
      application.vacancyId = cmd.vacancyId;

    if (cmd.resume) {
      if (application.resume && fs.existsSync(application.resume)) {
        fs.unlinkSync(application.resume);
      }

      application.resume = cmd.resume.path;
    }

    const saved = await Applications.save(application);

    return plainToInstance(UpdateApplicationsResponse, saved, {excludeExtraneousValues: true,});
  }
}