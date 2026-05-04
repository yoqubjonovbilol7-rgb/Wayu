import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Vacancies } from "@/features/careers/vacancies/vacancies.entity";
import {
    UpdateVacanciesCommand
} from "@/features/careers/vacancies/Admin/commands/update-vacancies/update-vacancies.command";
import {
    UpdateVacanciesResponse
} from "@/features/careers/vacancies/Admin/commands/update-vacancies/update-vacancies.response";

@CommandHandler(UpdateVacanciesCommand)
export class UpdateVacanciesHandler implements ICommandHandler<UpdateVacanciesCommand> {

    async execute(command: UpdateVacanciesCommand): Promise<UpdateVacanciesResponse> {
        const vacancy = await Vacancies.findOne({where: {id : command.id}});
        if (!vacancy) {
            throw new NotFoundException('Vacancy with given id not found');
        }
        if (command.title) {
            vacancy.title = command.title;
        }
        if (command.address) {
            vacancy.address = command.address;
        }
        if (command.description) {
            vacancy.description = command.description;
        }
        if (command.phoneNumber) {
            vacancy.phoneNumber = command.phoneNumber;
        }
        if (command.type) {
            vacancy.type = command.type;
        }
        if (command.salary) {
            vacancy.salary = command.salary;
        }
        if (command.isActive !== undefined) {
            vacancy.isActive = command.isActive;
        }

        const updatedVacancy = await vacancy.save();
        return plainToInstance(UpdateVacanciesResponse, updatedVacancy, {excludeExtraneousValues: true});
    }
}
