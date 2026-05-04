import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneLanguageQuery} from "@/features/library/language/Admin/queries/get-one-language/get-one-language.query";
import {
    GetOneLanguageResponse
} from "@/features/library/language/Admin/queries/get-one-language/get-one-language.response";
import {Language} from "@/features/library/language/language.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetOneLanguageQuery)
export class GetOneLanguageHandler implements IQueryHandler<GetOneLanguageQuery> {
    async execute(query : GetOneLanguageQuery) : Promise<GetOneLanguageResponse> {
        const language = await Language.findOne({where: {id : query.id}})
        if (!language) {
            throw new NotFoundException('id topilmadi')
        }

        return plainToInstance(GetOneLanguageResponse,language,{excludeExtraneousValues : true})
    }
}