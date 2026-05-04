import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneAuthorsPublicQuery} from "@/features/library/authors/Public/queries/get-one-authors/get-one-authors-public.query";
import {GetOneAuthorsPublicResponse} from "@/features/library/authors/Public/queries/get-one-authors/get-one-authors-public.response";
import {Author} from "@/features/library/authors/author.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetOneAuthorsPublicQuery)
export class GetOneAuthorsPublicHandler implements IQueryHandler<GetOneAuthorsPublicQuery> {

    async execute(query : GetOneAuthorsPublicQuery) : Promise<GetOneAuthorsPublicResponse> {
        const authors = await Author.findOne({where : query})
        if (!authors) {
            throw  new NotFoundException('id topilmadi')
        }
        return plainToInstance(GetOneAuthorsPublicResponse,authors,{excludeExtraneousValues : true})
    }
}
