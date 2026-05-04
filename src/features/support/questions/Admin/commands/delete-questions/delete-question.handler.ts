import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {
    DeleteQuestionCommand
} from "@/features/support/questions/Admin/commands/delete-questions/delete-question.command";
import {Questions} from "@/features/support/questions/questions.entity";


@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
    async execute(cmd: DeleteQuestionCommand): Promise<void> {
        const question = await Questions.findOneBy({id: cmd.id});
        if (!question)
            throw new NotFoundException("Question with given id not found");

        await Questions.remove(question);
    }
}
