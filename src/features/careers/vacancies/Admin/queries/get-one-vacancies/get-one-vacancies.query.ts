import {Query} from "@nestjs/cqrs";
import {GetOneCareersVacanciesResponse} from "@/features/careers/vacancies/Admin/queries/get-one-vacancies/get-one-vacancies.response";

export class GetOneVacanciesQuery extends Query<GetOneCareersVacanciesResponse>{
    constructor(public readonly id : number) {
        super();
    }
}
