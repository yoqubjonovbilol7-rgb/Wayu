import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '@/features/vacancies/vacancies.entity';
import { UpdateVacanciesCommand } from './update-vacancies.command';
import { UpdateVacanciesResponse } from './update-vacancies.response';

@CommandHandler(UpdateVacanciesCommand)
export class UpdateVacanciesHandler implements ICommandHandler<UpdateVacanciesCommand> {
  async execute(command: UpdateVacanciesCommand): Promise<UpdateVacanciesResponse> {
    const vacancy = await Vacancies.findOne({ where: { id: command.id } });
    if (!vacancy) {
      throw new NotFoundException('Vacancy with given id not found');
    }
    if (command.title !== undefined) {
      vacancy.title = command.title;
    }
    if (command.address !== undefined) {
      vacancy.address = command.address;
    }
    if (command.description !== undefined) {
      vacancy.description = command.description;
    }
    if (command.phoneNumber !== undefined) {
      vacancy.phoneNumber = command.phoneNumber;
    }
    if (command.type !== undefined) {
      vacancy.type = command.type;
    }
    if (command.salary !== undefined) {
      vacancy.salary = command.salary;
    }
    if (command.isActive !== undefined) {
      vacancy.isActive = command.isActive;
    }

    const updatedVacancy = await vacancy.save();
    return plainToInstance(UpdateVacanciesResponse, updatedVacancy, { excludeExtraneousValues: true });
  }
}