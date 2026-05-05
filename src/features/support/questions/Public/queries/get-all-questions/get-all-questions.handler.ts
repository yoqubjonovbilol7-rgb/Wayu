import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuestionsPublicQuery } from '@/features/support/questions/Public/queries/get-all-questions/get-all-questions.query';
import { QuestionPublicResponse } from '@/features/support/questions/Public/queries/get-all-questions/get-all-questions.response';
import { Questions } from '@/features/support/questions/questions.entity';
import { plainToInstance } from 'class-transformer';


@QueryHandler(GetAllQuestionsPublicQuery)
export class GetAllQuestionsPublicHandler implements IQueryHandler<GetAllQuestionsPublicQuery> {
  async execute(query: GetAllQuestionsPublicQuery): Promise<QuestionPublicResponse[]> {
    const take = query.filters?.size ?? 10;
    const currentPage = query.filters?.page ?? 1;
    const skip = (currentPage - 1) * take;

    const data = await Questions.find({
      skip,
      take,
    });

    return plainToInstance(QuestionPublicResponse, data, {excludeExtraneousValues: true});
  }
}