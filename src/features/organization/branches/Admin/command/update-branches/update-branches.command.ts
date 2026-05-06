import { Command } from "@nestjs/cqrs";
import { UpdateBranchesResponse } from "@/features/organization/branches/Admin/command/update-branches/update-branches.response";

export class UpdateBranchesCommand extends Command<UpdateBranchesResponse> {
  constructor(
    public readonly id: number,
    public readonly countryId?: number,
    public readonly representativeId?: number,
    public readonly city?: string,
    public readonly latitude?: number,
    public readonly longitude?: number,
    public readonly phoneNumber?: string,
  ) {
    super();
  }
}