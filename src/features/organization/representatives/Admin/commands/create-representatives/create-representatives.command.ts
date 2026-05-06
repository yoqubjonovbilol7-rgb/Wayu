import {Command} from "@nestjs/cqrs";
import {
    CreateRepresentativesResponse
} from "@/features/organization/representatives/Admin/commands/create-representatives/create-representatives.response";

export class CreateRepresentativesCommand extends Command<CreateRepresentativesResponse>{
    constructor(
        public readonly fullName: string,
        public readonly image: Express.Multer.File,
        public readonly email: string,
        public readonly phoneNumber: string,
        public readonly resume: string
    ) {
        super();
    }
}