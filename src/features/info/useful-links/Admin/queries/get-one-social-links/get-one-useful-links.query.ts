import { Query } from '@nestjs/cqrs';
import {GetOneUsefulLinkResponse} from './get-one-useful-links.response';

export class GetOneUsefulLinkQuery extends Query<GetOneUsefulLinkResponse> {
  constructor(public readonly id: number) {
    super();
  }
}