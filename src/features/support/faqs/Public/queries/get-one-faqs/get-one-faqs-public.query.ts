import { Query } from '@nestjs/cqrs';
import {GetOneFaqsResponse} from "@/features/support/faqs/Public/queries/get-one-faqs/get-one-faqs-public.response";


export class GetOneFaqsQuery extends Query<GetOneFaqsResponse> {
    constructor(public readonly id: number) {
        super();
    }
}