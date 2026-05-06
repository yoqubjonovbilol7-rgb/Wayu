import {Command} from "@nestjs/cqrs";
import {CreateCareersVacanciesResponse} from "@/features/careers/vacancies/Admin/commands/create-vacancies/create-vacancies.response";


export class CreateVacanciesCommand extends Command<CreateCareersVacanciesResponse> {
    constructor(
        public title: string,
        public address: string,
        public description: string,
        public phoneNumber: string,
        public type: string,
        public salary: string,
    ) {
        super();
    }
}
