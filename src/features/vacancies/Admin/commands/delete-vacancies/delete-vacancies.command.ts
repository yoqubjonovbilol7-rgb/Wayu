import { Command } from '@nestjs/cqrs';

export class DeleteVacanciesCommand extends Command<void> {
  constructor(public readonly id: number) {
    super();
  }
}