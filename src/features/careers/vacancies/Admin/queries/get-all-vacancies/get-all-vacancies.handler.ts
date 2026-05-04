import {plainToInstance} from "class-transformer";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {GetAllVacanciesQuery} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.query";
import {GetAllVacanciesResponse} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.response";
import {Vacancies} from "@/features/careers/vacancies/vacancies.entity";


@QueryHandler(GetAllVacanciesQuery)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesQuery> {
    async execute(query: GetAllVacanciesQuery): Promise<GetAllVacanciesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: any = {};
        if (query.filters.isActive !== undefined) {
            where.isActive = query.filters.isActive;
        }

        const vacancies = await Vacancies.find({
            where: where,
            skip: skip,
            take: take,
        });
        return plainToInstance(GetAllVacanciesResponse, vacancies, {excludeExtraneousValues: true});
    }
}
