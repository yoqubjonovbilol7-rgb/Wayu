import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {Countries} from "@/features/organization/countries/countries.entity";
import {
    GetOneCountriesQuery
} from "@/features/organization/countries/Public/queries/get-one-counries/get-one-countries.query";
import {
    GetOneCountriesResponse
} from "@/features/organization/countries/Public/queries/get-one-counries/get-one-countries.response";



@QueryHandler(GetOneCountriesQuery)
export class GetOnePublicCountriesHandler implements IQueryHandler<GetOneCountriesQuery> {
    async execute(query : GetOneCountriesQuery) : Promise<GetOneCountriesResponse> {
        const countries = await Countries.findOne({where : query})
        if (!countries) {
            throw new NotFoundException('id topilmadi')
        }
        return plainToInstance(GetOneCountriesResponse,countries,{excludeExtraneousValues : true})
    }
}