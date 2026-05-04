import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneLanguagePublicQuery} from "@/features/library/language/Public/queries/get-one-language/get-one-language-public.query";
import {GetOneLanguagePublicResponse} from "@/features/library/language/Public/queries/get-one-language/get-one-language-public.response";
import {Language} from "@/features/library/language/language.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetOneLanguagePublicQuery)
export class GetOneLanguagePublicHandler implements IQueryHandler<GetOneLanguagePublicQuery> {
    async execute(query : GetOneLanguagePublicQuery) : Promise<GetOneLanguagePublicResponse> {
        const language = await Language.findOne({where :{id : query.id}})
        if(!language) {
            throw new NotFoundException('id topilmadi')
        }

        return plainToInstance(GetOneLanguagePublicResponse,language,{excludeExtraneousValues : true})
    }
}