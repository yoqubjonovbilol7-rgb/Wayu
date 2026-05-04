import {Query} from "@nestjs/cqrs";
import {
    GetOneCountriesResponse
} from "@/features/organization/countries/Public/queries/get-one-counries/get-one-countries.response";



export class GetOneCountriesQuery extends Query<GetOneCountriesResponse> {
    constructor(public readonly id : number) {
        super();
    }
}