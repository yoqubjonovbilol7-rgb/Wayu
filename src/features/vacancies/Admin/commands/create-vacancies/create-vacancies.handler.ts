import { CreateVacanciesCommand } from './create-vacancies.command';
import { CreateVacanciesResponse } from './create-vacancies.response';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Vacancies } from '@/features/vacancies/vacancies.entity';

@CommandHandler(CreateVacanciesCommand)
export class CreateVacanciesHandler implements ICommandHandler<CreateVacanciesCommand> {
  async execute(command: CreateVacanciesCommand): Promise<CreateVacanciesResponse> {
    const newVacancy = Vacancies.create({
      title: command.title,
      address: command.address,
      description: command.description,
      phoneNumber: command.phoneNumber,
      type: command.type,
      salary: command.salary,
      isActive: true,
    } as Vacancies);

    await Vacancies.save(newVacancy);

    return plainToInstance(CreateVacanciesResponse, newVacancy, { excludeExtraneousValues: true });
  }
}