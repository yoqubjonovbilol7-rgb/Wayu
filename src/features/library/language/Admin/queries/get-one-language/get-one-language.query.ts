import {Query} from "@nestjs/cqrs";
import {
    GetOneLanguageResponse
} from "@/features/library/language/Admin/queries/get-one-language/get-one-language.response";

export class GetOneLanguageQuery extends Query<GetOneLanguageResponse>{
    constructor(public readonly id : number) {
        super();
    }
}