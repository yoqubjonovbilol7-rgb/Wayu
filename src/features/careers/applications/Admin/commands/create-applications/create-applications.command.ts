import { Command } from "@nestjs/cqrs";

export class CreateApplicationsCommand extends Command<any> {
  constructor(
    public readonly fullName: string,
    public readonly phoneNumber: string,
    public readonly email: string,
    public readonly vacancyId: number,
    public readonly resume: Express.Multer.File,
  ) {
    super();
  }
}