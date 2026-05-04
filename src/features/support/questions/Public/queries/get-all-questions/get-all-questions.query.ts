import { Query } from '@nestjs/cqrs';
import { GetAllQuestionsPublicResponse } from './get-all-questions.response';
import { GetAllQuestionsPublicFilters } from './get-all-questions.filters';

export class GetAllQuestionsPublicQuery extends Query<GetAllQuestionsPublicResponse> {
  constructor(public readonly filters: GetAllQuestionsPublicFilters) {
    super();
  }
}

