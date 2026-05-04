import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneBookQuery } from './get-one-book.query';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {GetOneBookResponse} from "@/features/library/book/Admin/queries/get-one-book/get-one-book.response";
import {Book} from "@/features/library/book/book.entity";


@QueryHandler(GetOneBookQuery)
export class GetOneBookHandler implements IQueryHandler<GetOneBookQuery> {

    async execute(query: GetOneBookQuery): Promise<GetOneBookResponse> {

        const book = await Book.findOne({where: { id : query.id}});
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return plainToInstance(GetOneBookResponse, book, {excludeExtraneousValues: true,});
    }
}