import { Query } from '@nestjs/cqrs';
import { GetAllVacanciesPublicResponse } from './get-all-vacancies.response';
import { GetAllVacanciesPublicFilters } from './get-all-vacancies.filters';

export class GetAllVacanciesPublicQuery extends Query<GetAllVacanciesPublicResponse[]> {
  constructor(public readonly filters: GetAllVacanciesPublicFilters) {
    super();
  }
}