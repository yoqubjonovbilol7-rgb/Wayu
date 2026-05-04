import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "@nestjs/common";

import { CreateCountriesCommand } from "./create-countries.command";
import { CreateCountriesResponse } from "./create-countries.response";
import { Countries } from "@/features/organization/countries/countries.entity";

@CommandHandler(CreateCountriesCommand)
export class CreateCountriesHandler implements ICommandHandler<CreateCountriesCommand> {
    async execute(cmd: CreateCountriesCommand): Promise<CreateCountriesResponse> {
        const exists = await Countries.exists({where: { title: cmd.title },});
        if (exists) {
            throw new BadRequestException("Bu country allaqachon mavjud");
        }
        const country = Countries.create({
            title: cmd.title,
            flag: cmd.flag.path,
        });
        await country.save();
        return plainToInstance(CreateCountriesResponse, country, {excludeExtraneousValues: true,});
    }
}