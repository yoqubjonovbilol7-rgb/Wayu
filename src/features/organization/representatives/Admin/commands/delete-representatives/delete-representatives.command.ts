import { Command } from '@nestjs/cqrs';

export class DeleteRepresentativesCommand extends Command<void> {
  constructor(public readonly id: number) {
    super();
  }
}
