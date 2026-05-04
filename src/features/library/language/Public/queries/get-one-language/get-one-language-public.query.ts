import {Query} from "@nestjs/cqrs";
import {
    GetOneLanguagePublicResponse
} from "@/features/library/language/Public/queries/get-one-language/get-one-language-public.response";

export class GetOneLanguagePublicQuery extends Query<GetOneLanguagePublicResponse>{
    constructor(public readonly id : number) {
        super();
    }
}