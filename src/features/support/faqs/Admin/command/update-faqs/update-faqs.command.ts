import { Command } from '@nestjs/cqrs';
import { UpdateFaqsResponse } from './update-faqs.response';

export class UpdateFaqsCommand extends Command<UpdateFaqsResponse> {
    constructor(
        public readonly id: number,
        public readonly question?: string,
        public readonly answer?: string,
    ) {
        super();
    }
}