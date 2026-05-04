import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCountriesCommand } from "@/features/organization/countries/Admin/commands/update-counries/update-countries.command";
import { UpdateCountriesResponse } from "@/features/organization/countries/Admin/commands/update-counries/update-countries.response";
import { Countries } from "@/features/organization/countries/countries.entity";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import fs from 'fs';

@CommandHandler(UpdateCountriesCommand)
export class UpdateCountriesHandler implements ICommandHandler<UpdateCountriesCommand> {
    async execute(command: UpdateCountriesCommand): Promise<UpdateCountriesResponse> {
        const country = await Countries.findOne({ where: { id: command.id } });
        if (!country) {
            if (command.flag?.path) fs.unlinkSync(command.flag.path);
            throw new NotFoundException('ID bo‘yicha davlat topilmadi');
        }
        if (command.title) {
            country.title = command.title;
        }
        if (command.flag) {
            if (country.flag && fs.existsSync(country.flag)) {
                try {
                    fs.unlinkSync(country.flag);
                } catch (err) {
                    console.error("Eski faylni o'chirishda xatolik:", err);
                }
            }
            country.flag = command.flag.path;
        }

        const updatedCountry = await country.save();
        return plainToInstance(UpdateCountriesResponse, updatedCountry, {excludeExtraneousValues: true});
    }
}