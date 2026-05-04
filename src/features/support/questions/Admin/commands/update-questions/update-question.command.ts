import {Command} from "@nestjs/cqrs";
import {UpdateQuestionResponse} from "@/features/support/questions/Admin/commands/update-questions/update-question.response";
import {QuestionStatus} from "@/core/enums/paymentProvider.enum";

export class UpdateQuestionCommand extends Command<UpdateQuestionResponse>{
    constructor(
        public id: number,
        public fullName?: string,
        public phoneNumber?: string,
        public question?: string,
        public status?: QuestionStatus,
    ) {
        super();
    }
}
