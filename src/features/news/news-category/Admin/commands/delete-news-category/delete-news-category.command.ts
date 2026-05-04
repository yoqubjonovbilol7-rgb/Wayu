import { Command } from '@nestjs/cqrs';

export class DeleteNewsCategoryCommand extends Command<void> {
    constructor(public readonly id: number) {
        super();
    }
}