import {Query} from "@nestjs/cqrs";
import {GetAllVacanciesFilters} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.filters";
import {GetAllVacanciesResponse} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.response";

export class GetAllVacanciesQuery extends Query<GetAllVacanciesResponse[]> {
    constructor(public readonly filters: GetAllVacanciesFilters) {
        super();
    }
}
