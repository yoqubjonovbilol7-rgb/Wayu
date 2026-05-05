import { Query } from '@nestjs/cqrs';

import { GetAllQuestionsPublicFilters } from './get-all-questions.filters';
import { QuestionPublicResponse } from '@/features/support/questions/Public/queries/get-all-questions/get-all-questions.response';

export class GetAllQuestionsPublicQuery extends Query<QuestionPublicResponse[]> {
  constructor(public readonly filters: GetAllQuestionsPublicFilters) {
    super();
  }
}

