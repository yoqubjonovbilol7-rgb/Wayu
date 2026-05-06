import { Query } from '@nestjs/cqrs';
import { GetAllStaticInfoPublicFilters } from './get-all-static-info.filters';
import {
  StaticInfoPublicResponse
} from '@/features/info/static-info/Public/queries/get-all-static-info/get-all-static-info.response';

export class GetAllStaticInfoPublicQuery extends Query<StaticInfoPublicResponse []> {
  constructor(public readonly filters: GetAllStaticInfoPublicFilters) {
    super();
  }
}