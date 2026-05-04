import {Query} from "@nestjs/cqrs";
import {GetAllLanguagePublicResponse} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.response";
import {GetAllLanguagePublicFilters} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.filters";

export class GetAllLanguagePublicQuery extends Query<GetAllLanguagePublicResponse[]>{
    constructor(public readonly  filters: GetAllLanguagePublicFilters) {
        super();
    }
}