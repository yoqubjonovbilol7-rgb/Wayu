import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Representatives } from "@/features/organization/representatives/representatives.entity";
import { CreateRepresentativesResponse } from "@/features/organization/representatives/Admin/commands/create-representatives/create-representatives.response";
import { CreateRepresentativesCommand } from "@/features/organization/representatives/Admin/commands/create-representatives/create-representatives.command";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateRepresentativesCommand)
export class CreateRepresentativesHandler implements ICommandHandler<CreateRepresentativesCommand> {

    async execute(cmd: CreateRepresentativesCommand): Promise<CreateRepresentativesResponse> {

        if (!cmd.image || !cmd.image.filename) {
            throw new BadRequestException('Rasm yuklanishi shart');
        }

        const newRepresentative = Representatives.create({
            fullName: cmd.fullName,
            image: cmd.image.filename,
            email: cmd.email,
            phoneNumber: cmd.phoneNumber,
            resume: cmd.resume
        } as any);

        const saved = await Representatives.save(newRepresentative);

        return plainToInstance(CreateRepresentativesResponse, saved, {
            excludeExtraneousValues: true
        });
    }
}