import { Query } from '@nestjs/cqrs';
import { GetAllApplicationsPublicResponse } from './get-all-applications.response';
import { GetAllApplicationsPublicFilters } from './get-all-applications.filters';

export class GetAllApplicationsPublicQuery extends Query<GetAllApplicationsPublicResponse[]> {
  constructor(public readonly filters: GetAllApplicationsPublicFilters) {
    super();
  }
}