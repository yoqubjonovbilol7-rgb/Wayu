import { Command } from '@nestjs/cqrs';
import { CreateFaqsResponse } from '@/features/support/faqs/Admin/command/create-faqs/create-faqs.response';

export class CreateFaqsCommand extends Command<CreateFaqsResponse> {
    constructor(
        public readonly question: string,
        public readonly answer: string,
    ) {
        super();
    }
}