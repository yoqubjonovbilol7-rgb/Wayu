import { Command } from '@nestjs/cqrs';

export class DeleteBooksCommand extends Command<void> {
    constructor(public readonly id: number) {
        super();
    }
}