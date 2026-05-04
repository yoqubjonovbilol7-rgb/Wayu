import {plainToInstance} from "class-transformer";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {GetAllQuestionsQuery} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.query";
import {GetAllQuestionsResponse} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.response";
import {Questions} from "@/features/support/questions/questions.entity";


@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsQuery> {
    async execute(query: GetAllQuestionsQuery): Promise<GetAllQuestionsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        let where: any ={};
        if (query.filters.status) {
            where.status = query.filters.status;
        }

        const questions = await Questions.find({where, skip: skip, take: take});
        return plainToInstance(GetAllQuestionsResponse, questions, {excludeExtraneousValues: true});
    }
}
