import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Representatives } from '@/features/organization/representatives/representatives.entity';
import { DeleteRepresentativesCommand } from './delete-representatives.command';

@CommandHandler(DeleteRepresentativesCommand)
export class DeleteRepresentativesHandler implements ICommandHandler<DeleteRepresentativesCommand> {
  constructor(private readonly manager: EntityManager) {}

  async execute(command: DeleteRepresentativesCommand): Promise<void> {
    const representative = await this.manager.findOne(Representatives, { where: { id: command.id } });

    if (!representative) {
      throw new NotFoundException('Representative not found');
    }

    await this.manager.delete(Representatives, command.id);
  }
}
