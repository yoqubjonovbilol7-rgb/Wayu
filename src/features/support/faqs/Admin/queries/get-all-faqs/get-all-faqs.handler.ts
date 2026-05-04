import { plainToInstance } from 'class-transformer';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { Faq } from '@/features/support/faqs/faqs.entity';
import { GetAllFaqsQuery } from './get-all-faqs.query';
import { GetAllFaqsResponse } from './get-all-faqs.response';

@QueryHandler(GetAllFaqsQuery)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsQuery> {
    async execute(query: GetAllFaqsQuery,): Promise<GetAllFaqsResponse[]> {

        const take = query.filters?.size ?? 10;
        const currentPage = query.filters?.page ?? 1;
        const skip = (currentPage - 1) * take;

        const faqs = await Faq.find({skip : skip, take : take});

        return plainToInstance(GetAllFaqsResponse, faqs, {
            excludeExtraneousValues: true,
        });
    }
}