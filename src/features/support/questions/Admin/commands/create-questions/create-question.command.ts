import {Command} from "@nestjs/cqrs";
import {CreateQuestionResponse} from "@/features/support/questions/Admin/commands/create-questions/create-question.response";


export class CreateQuestionCommand extends Command<CreateQuestionResponse> {
    constructor(
        public fullName: string,
        public phoneNumber: string,
        public question: string,
    ) {
        super();
    }
}
