import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import {
    GetAllCountriesQuery
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.query";
import {
    GetAllCountriesResponse
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.response";
import {Countries} from "@/features/organization/countries/countries.entity";
@QueryHandler(GetAllCountriesQuery)
export class GetAllCountriesPublicHandler implements IQueryHandler<GetAllCountriesQuery> {

    async execute(query: GetAllCountriesQuery): Promise<GetAllCountriesResponse[]> {

        const take = query.filters?.size ?? 10;
        const currentPage = query.filters?.page ?? 1;
        const skip = (currentPage - 1) * take;

        const countries = await Countries.find({skip: skip, take: take,});

        return plainToInstance(GetAllCountriesResponse, countries, {
            excludeExtraneousValues: true
        });
    }
}