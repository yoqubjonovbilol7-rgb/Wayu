import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {GetOneQuestionPublicQuery} from "@/features/support/questions/Public/queries/get-one-questions/get-one-question.query";
import {Questions} from "@/features/support/questions/questions.entity";
import {GetOneQuestionResponse} from "@/features/support/questions/Public/queries/get-one-questions/get-one-question.response";
import {QuestionStatus} from "@/core/enums/paymentProvider.enum";

@QueryHandler(GetOneQuestionPublicQuery)
export class GetOneQuestionPublicHandler implements IQueryHandler<GetOneQuestionPublicQuery> {

    async execute(query: GetOneQuestionPublicQuery): Promise<GetOneQuestionResponse> {
        const question = await Questions.findOne({
            where: { 
                id: query.id,
                status: QuestionStatus.ANSWERED
            }
        });
        if (!question) {
            throw new NotFoundException(`Question with id ${query.id} not found`);
        }

        return plainToInstance(GetOneQuestionResponse, question, {excludeExtraneousValues: true});
    }
}
