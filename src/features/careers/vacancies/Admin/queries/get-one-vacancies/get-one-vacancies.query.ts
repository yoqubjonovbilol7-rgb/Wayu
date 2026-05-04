import {Query} from "@nestjs/cqrs";
import {GetOneVacanciesResponse} from "@/features/careers/vacancies/Admin/queries/get-one-vacancies/get-one-vacancies.response";

export class GetOneVacanciesQuery extends Query<GetOneVacanciesResponse>{
    constructor(public readonly id : number) {
        super();
    }
}
