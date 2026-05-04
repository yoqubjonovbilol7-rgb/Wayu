import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {
    GetOneCountriesQuery
} from "@/features/organization/countries/Public/queries/get-one-counries/get-one-countries.query";
import {QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {
    GetAllCountriesResponse
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.response";
import {
    GetAllCountriesFilters
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.filters";
import {
    GetAllCountriesQuery
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.query";


@Controller('public/countries')
export class CountriesPublicController {
    constructor(private readonly  queriesBus : QueryBus) {
    }

    @Get(':id')
    async getOneCountry(@Param('id', ParseIntPipe) id: number) {
        return await this.queriesBus.execute(new GetOneCountriesQuery(id));
    }


    @Get()
    @ApiOkResponse({ type: GetAllCountriesResponse })
    async getAllCountries(@Query() filters: GetAllCountriesFilters) {
        return await this.queriesBus.execute(new GetAllCountriesQuery(filters));
    }
}