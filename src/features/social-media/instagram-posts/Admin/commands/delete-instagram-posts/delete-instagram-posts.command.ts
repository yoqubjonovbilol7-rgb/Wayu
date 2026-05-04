import { Command } from '@nestjs/cqrs';

export class DeleteInstagramPostsCommand extends Command<void> {
    constructor(public readonly id: number) {
        super();
    }
}