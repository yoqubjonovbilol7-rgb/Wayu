import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { Faq } from '@/features/support/faqs/faqs.entity';
import {GetOneFaqsQuery} from "@/features/support/faqs/Public/queries/get-one-faqs/get-one-faqs-public.query";
import {GetOneFaqsResponse} from "@/features/support/faqs/Public/queries/get-one-faqs/get-one-faqs-public.response";


@QueryHandler(GetOneFaqsQuery)
export class GetOneFaqsPublicHandler
    implements IQueryHandler<GetOneFaqsQuery>
{
    async execute(query: GetOneFaqsQuery,): Promise<GetOneFaqsResponse> {
        const faq = await Faq.findOne({where: { id: query.id },});
        if (!faq) {
            throw new NotFoundException('FAQ not found');
        }
        return plainToInstance(GetOneFaqsResponse, faq, {excludeExtraneousValues: true,});
    }
}