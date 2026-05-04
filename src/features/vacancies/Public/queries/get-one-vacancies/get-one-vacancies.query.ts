import { Query } from '@nestjs/cqrs';
import { GetOneVacancyPublicResponse } from './get-one-vacancies.response';

export class GetOneVacancyPublicQuery extends Query<GetOneVacancyPublicResponse> {
  constructor(public readonly id: number) {
    super();
  }
}