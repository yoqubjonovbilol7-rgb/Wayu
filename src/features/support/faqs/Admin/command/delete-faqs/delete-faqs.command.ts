import { Command } from '@nestjs/cqrs';

export class DeleteFaqsCommand extends Command<void> {
    constructor(public readonly id: number) {
        super();
    }
}