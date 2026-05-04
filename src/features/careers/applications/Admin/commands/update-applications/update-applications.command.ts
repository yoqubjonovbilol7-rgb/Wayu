import { Command } from "@nestjs/cqrs";
import { UpdateApplicationsResponse } from "@/features/careers/applications/Admin/commands/update-applications/update-applications.response";

export class UpdateApplicationsCommand extends Command<UpdateApplicationsResponse> {
  constructor(
    public readonly id: number,
    public readonly fullName?: string,
    public readonly phoneNumber?: string,
    public readonly email?: string,
    public readonly vacancyId?: number,
    public readonly resume?: Express.Multer.File,
  ) {
    super();
  }
}