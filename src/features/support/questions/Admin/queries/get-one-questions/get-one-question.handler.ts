import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {GetOneQuestionQuery} from "@/features/support/questions/Admin/queries/get-one-questions/get-one-question.query";
import {Questions} from "@/features/support/questions/questions.entity";
import {GetOneQuestionResponse} from "@/features/support/questions/Admin/queries/get-one-questions/get-one-question.response";

@QueryHandler(GetOneQuestionQuery)
export class GetOneQuestionHandler implements IQueryHandler<GetOneQuestionQuery> {

    async execute(query: GetOneQuestionQuery): Promise<GetOneQuestionResponse> {
        const question = await Questions.findOne({where: { id: query.id }});
        if (!question) {
            throw new NotFoundException(`Question with id ${query.id} not found`);
        }

        return plainToInstance(GetOneQuestionResponse, question, {excludeExtraneousValues: true});
    }
}
