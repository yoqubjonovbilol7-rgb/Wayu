import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {GetAllAuthorsPublicQuery} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.query";
import {GetAllAuthorsPublicResponse} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.response";

import { Author } from "@/features/library/authors/author.entity";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetAllAuthorsPublicQuery)
export class GetAllAuthorsPublicHandler implements IQueryHandler<GetAllAuthorsPublicQuery> {
    async execute(query: GetAllAuthorsPublicQuery): Promise<GetAllAuthorsPublicResponse[]> {
        const take = query.filters?.size ?? 10;
        const currentPage = query.filters?.page ?? 1;
        const skip = (currentPage - 1) * take;

        const authors = await Author.find({skip: skip, take: take});

        return plainToInstance(GetAllAuthorsPublicResponse, authors, {excludeExtraneousValues: true});

    }

}