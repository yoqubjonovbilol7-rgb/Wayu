import {CreateQuestionCommand} from './create-question.command';
import {CreateQuestionResponse} from './create-question.response';
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Questions} from "@/features/support/questions/questions.entity";
import {QuestionStatus} from "@/core/enums/paymentProvider.enum";

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {

    async execute(command: CreateQuestionCommand): Promise<CreateQuestionResponse> {
        const newQuestion = Questions.create({
            fullName: command.fullName,
            phoneNumber: command.phoneNumber,
            question: command.question,
            status: QuestionStatus.PENDING,
        } as Questions);
        
        await Questions.save(newQuestion);

        return plainToInstance(CreateQuestionResponse, newQuestion, {excludeExtraneousValues: true});
    }
}
