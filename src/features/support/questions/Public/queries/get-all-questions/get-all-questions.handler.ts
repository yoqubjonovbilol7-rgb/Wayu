import { plainToInstance } from "class-transformer";

import { Questions } from "@/features/support/questions/questions.entity";
import { GetAllQuestionsPublicQuery } from "./get-all-questions.query";
import type { IQueryHandler } from "@nestjs/cqrs";
import { QueryHandler } from "@nestjs/cqrs";
import {QuestionPublicResponse} from "@/features/support/questions/Public/queries/get-all-questions/get-all-questions.response";

@QueryHandler(GetAllQuestionsPublicQuery)
export class GetAllQuestionsPublicHandler implements IQueryHandler<GetAllQuestionsPublicQuery> {
  async execute(query: GetAllQuestionsPublicQuery,): Promise<QuestionPublicResponse []> {
    const take = query.filters?.size ?? 10;
    const currentPage = query.filters?.page ?? 1;
    const skip = (currentPage - 1) * take;

    const data = await Questions.find({
      skip,
      take,
      order: { id: "DESC" },
    });

    return plainToInstance(QuestionPublicResponse , data, {excludeExtraneousValues: true,});
  }
}