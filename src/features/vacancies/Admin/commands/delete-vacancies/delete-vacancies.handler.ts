import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteVacanciesCommand } from './delete-vacancies.command';
import { Vacancies } from '@/features/vacancies/vacancies.entity';

@CommandHandler(DeleteVacanciesCommand)
export class DeleteVacanciesHandler implements ICommandHandler<DeleteVacanciesCommand> {
  async execute(command: DeleteVacanciesCommand): Promise<void> {
    const vacancy = await Vacancies.findOneBy({ id: command.id });
    if (!vacancy) {
      throw new NotFoundException('Vacancy with given id not found');
    }

    await Vacancies.remove(vacancy);
  }
}