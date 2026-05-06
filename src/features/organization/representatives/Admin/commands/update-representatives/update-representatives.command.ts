import {Command} from "@nestjs/cqrs";
import {UpdateRepresentativeResponse} from "@/features/organization/representatives/Admin/commands/update-representatives/update-representatives.response";

export class UpdateRepresentativesCommand extends Command<UpdateRepresentativeResponse>{
  constructor(
    public readonly id : number,
    public readonly fullName: string,
    public readonly image: Express.Multer.File,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly resume: string
  ) {
    super();
  }
}