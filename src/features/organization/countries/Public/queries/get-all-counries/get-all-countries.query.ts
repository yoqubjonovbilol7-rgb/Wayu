import {Query} from "@nestjs/cqrs";
import {
    GetAllCountriesResponse
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.response";
import {
    GetAllCountriesFilters
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.filters";

export class GetAllCountriesQuery extends Query<GetAllCountriesResponse[]>{
    constructor(public readonly filters : GetAllCountriesFilters) {
        super();
    }

}