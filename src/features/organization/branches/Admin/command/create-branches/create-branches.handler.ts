import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CreateBranchesCommand } from "./create-branches.command";
import { CreateBranchesResponse } from "./create-branches.response";
import { Branch } from "@/features/organization/branches/branch.entity";
import {Countries} from "@/features/organization/countries/countries.entity";
import {Representatives} from "@/features/organization/representatives/representatives.entity";

@CommandHandler(CreateBranchesCommand)
export class CreateBranchesHandler implements ICommandHandler<CreateBranchesCommand> {

    async execute(command: CreateBranchesCommand): Promise<CreateBranchesResponse> {

        const isDuplicate = await Branch.exists({where: { phoneNumber: command.phoneNumber }});

        if (isDuplicate) {
            throw new BadRequestException("Ushbu telefon raqamli filial allaqachon mavjud");
        }

        const country = await Countries.findOne({where: { id: command.countryId }});

        if (!country) {
            throw new BadRequestException("Bunday country mavjud emas");
        }

        const representative = await Representatives.findOne({ where: { id: command.representativeId }
        });

        if (!representative) {
            throw new BadRequestException("Bunday representative mavjud emas");
        }

        try {
            const branch = Branch.create({
                ...command,
                country,
                representative
            });
            const savedBranch = await Branch.save(branch);
            return plainToInstance(CreateBranchesResponse, savedBranch, { excludeExtraneousValues: true });

        } catch (error) {
            console.log("ASL XATOLIK:", error);
            throw new InternalServerErrorException(error.message);
        }
    }
}