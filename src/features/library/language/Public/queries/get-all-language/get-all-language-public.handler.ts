import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllLanguagePublicQuery} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.query";
import {GetAllLanguagePublicResponse} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.response";
import {Language} from "@/features/library/language/language.entity";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetAllLanguagePublicQuery)
export class GetAllLanguagePublicHandler implements IQueryHandler<GetAllLanguagePublicQuery> {

    async execute(query: GetAllLanguagePublicQuery): Promise<GetAllLanguagePublicResponse[]> {
        const take = query.filters?.size ?? 10;
        const currentPage = query.filters?.page ?? 1;
        const skip = (currentPage - 1) * take;

        const languages = await Language.find({
            skip: skip,
            take: take,
        });

        return plainToInstance(GetAllLanguagePublicResponse, languages, {
            excludeExtraneousValues: true
        });
    }

}