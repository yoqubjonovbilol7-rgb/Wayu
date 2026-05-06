import { Query } from '@nestjs/cqrs';
import { GetOneStaticInfoResponse} from './get-one-static-info.response';

export class GetOneStaticInfoQuery extends Query<GetOneStaticInfoResponse> {
  constructor(public readonly id: number) {
    super();
  }
}