import {Command} from "@nestjs/cqrs";
import {
    CreateBranchesResponse
} from "@/features/organization/branches/Admin/command/create-branches/create-branches.response";

export class CreateBranchesCommand extends Command<CreateBranchesResponse>{
    constructor(
        public readonly countryId: number,
        public readonly representativeId: number,
        public readonly city: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly phoneNumber: string,
    ) {
        super();
    }
}