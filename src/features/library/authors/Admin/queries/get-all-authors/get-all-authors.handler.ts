import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllAuthorsQuery} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.query";
import {GetAllAuthorsResponse} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.response";
import {Author} from "@/features/library/authors/author.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllAuthorsQuery)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsQuery> {
    async execute(query : GetAllAuthorsQuery) : Promise<GetAllAuthorsResponse[]> {
        const take = query.filters.size ?? 10;
        const  currentPage = query.filters.page ?? 1
        const skip = (currentPage -1) * take

        const authors = await Author.find({skip : skip,take : take})
        return plainToInstance(GetAllAuthorsResponse,authors, {excludeExtraneousValues : true})
    }

}