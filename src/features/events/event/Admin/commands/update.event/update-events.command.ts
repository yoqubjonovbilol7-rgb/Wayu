import {Command} from "@nestjs/cqrs";
import {UpdateEventsResponse} from "@/features/events/event/Admin/commands/update.event/update-events.response";


export class UpdateEventCommand extends Command<UpdateEventsResponse> {
    constructor(
        public readonly id : number,
        public readonly categoryId: number,
        public readonly title: string,
        public readonly content: string,
        public readonly image: Express.Multer.File | undefined,
        public readonly date: string,
        public readonly address: string) {
        super();
    }
}