import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneAuthorsQuery} from "@/features/library/authors/Admin/queries/get-one-authors/get-one-authors.query";
import {GetOneAuthorsResponse} from "@/features/library/authors/Admin/queries/get-one-authors/get-one-authors.response";
import {Author} from "@/features/library/authors/author.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetOneAuthorsQuery)
export class GetOneAuthorsHandler implements IQueryHandler<GetOneAuthorsQuery>{

    async execute(query : GetOneAuthorsQuery) : Promise<GetOneAuthorsResponse> {
        const authors = await Author.findOne({where : query})
        if (!authors) {
            throw new NotFoundException('id topilmadi')
        }
        return plainToInstance(GetOneAuthorsResponse,authors,{excludeExtraneousValues : true})
    }
}