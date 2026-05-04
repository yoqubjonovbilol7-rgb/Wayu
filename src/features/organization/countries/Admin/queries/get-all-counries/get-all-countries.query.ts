import {Query} from "@nestjs/cqrs";
import {
    GetAllCountriesFilters
} from "@/features/organization/countries/Admin/queries/get-all-counries/get-all-countries.filters";
import {
    GetAllCountriesResponse
} from "@/features/organization/countries/Admin/queries/get-all-counries/get-all-countries.response";


export class GetAllCountriesQuery extends Query<GetAllCountriesResponse[]>{
    constructor(public readonly filters : GetAllCountriesFilters) {
        super();
    }

}