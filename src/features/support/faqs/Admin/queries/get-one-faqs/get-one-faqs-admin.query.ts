import { Query } from '@nestjs/cqrs';
import {GetOneFaqsResponse} from "@/features/support/faqs/Admin/queries/get-one-faqs/get-one-faqs-admin.response";


export class GetOneFaqsQuery extends Query<GetOneFaqsResponse> {
    constructor(public readonly id: number) {
        super();
    }
}