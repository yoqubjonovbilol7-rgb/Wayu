import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllLanguageQuery} from "@/features/library/language/Admin/queries/get-all-language/get-all-language.query";
import {GetAllLanguageResponse} from "@/features/library/language/Admin/queries/get-all-language/get-all-language.response";
import {Language} from "@/features/library/language/language.entity";


@QueryHandler(GetAllLanguageQuery)
export class GetAllLanguageHandler implements IQueryHandler<GetAllLanguageQuery> {
    async execute(query : GetAllLanguageQuery) : Promise<GetAllLanguageResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const language = await Language.find({skip : skip,take : take})

        return plainToInstance(GetAllLanguageResponse,language , {excludeExtraneousValues : true})
    }

}