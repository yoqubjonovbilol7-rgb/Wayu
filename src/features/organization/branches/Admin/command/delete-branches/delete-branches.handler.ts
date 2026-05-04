import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import {Branch} from "@/features/organization/branches/branch.entity";
import {
    DeleteBranchesCommand
} from "@/features/organization/branches/Admin/command/delete-branches/delete-branches.command";

@CommandHandler(DeleteBranchesCommand)
export class DeleteBranchHandler implements ICommandHandler<DeleteBranchesCommand> {

    async execute(cmd: DeleteBranchesCommand): Promise<void> {
        const branch = await Branch.findOneBy({ id: cmd.id });

        if (!branch) {
            throw new NotFoundException('Branch with given id not found');
        }

        await Branch.remove(branch);
    }
}