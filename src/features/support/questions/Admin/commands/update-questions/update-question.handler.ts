import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Questions } from "@/features/support/questions/questions.entity";
import {
    UpdateQuestionCommand
} from "@/features/support/questions/Admin/commands/update-questions/update-question.command";
import {
    UpdateQuestionResponse
} from "@/features/support/questions/Admin/commands/update-questions/update-question.response";

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand> {

    async execute(command: UpdateQuestionCommand): Promise<UpdateQuestionResponse> {
        const question = await Questions.findOne({where: {id : command.id}});
        if (!question) {
            throw new NotFoundException('Question with given id not found');
        }
        if (command.fullName) {
            question.fullName = command.fullName;
        }
        if (command.phoneNumber) {
            question.phoneNumber = command.phoneNumber;
        }
        if (command.question) {
            question.question = command.question;
        }
        if (command.status) {
            question.status = command.status;
        }

        const updatedQuestion = await question.save();
        return plainToInstance(UpdateQuestionResponse, updatedQuestion, {excludeExtraneousValues: true});
    }
}
