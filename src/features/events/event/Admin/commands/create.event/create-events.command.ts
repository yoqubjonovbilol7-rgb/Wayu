import { Command } from "@nestjs/cqrs";
import { CreateEventsResponse } from "@/features/events/event/Admin/commands/create.event/create-events.response";

export class CreateEventsCommand extends Command<CreateEventsResponse> {
    constructor(
        public readonly categoryId: number,
        public readonly title: string,
        public readonly content: string,
        public readonly image: Express.Multer.File,
        public readonly date: string,
        public readonly address: string,
    ) {
        super();
    }
}