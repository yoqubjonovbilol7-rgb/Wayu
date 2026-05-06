import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {UpdateBranchesResponse} from "@/features/organization/branches/Admin/command/update-branches/update-branches.response";
import {NotFoundException} from "@nestjs/common";
import {Branch} from "@/features/organization/branches/branch.entity";
import {UpdateBranchesCommand} from "@/features/organization/branches/Admin/command/update-branches/update-branches.command";

@CommandHandler(UpdateBranchesCommand)
export class UpdateBranchesHandler implements ICommandHandler<UpdateBranchesCommand> {
  async execute(cmd: UpdateBranchesCommand): Promise<UpdateBranchesResponse> {
    const branch = await Branch.findOneBy({ id: cmd.id });

    if (!branch) throw new NotFoundException('Filial topilmadi');

    if (cmd.countryId)
      branch.countryId = cmd.countryId;
    if (cmd.representativeId)
      branch.representativeId = cmd.representativeId;
    if (cmd.city)
      branch.city = cmd.city;
    if (cmd.latitude)
      branch.latitude = cmd.latitude;
    if (cmd.longitude)
      branch.longitude = cmd.longitude;
    if (cmd.phoneNumber)
      branch.phoneNumber = cmd.phoneNumber;

    const saved = await Branch.save(branch);
    return plainToInstance(UpdateBranchesResponse, saved, { excludeExtraneousValues: true });
  }
}