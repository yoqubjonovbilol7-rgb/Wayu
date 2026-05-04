import {Command} from "@nestjs/cqrs";
import {CreateVacanciesResponse} from "@/features/careers/vacancies/Admin/commands/create-vacancies/create-vacancies.response";


export class CreateVacanciesCommand extends Command<CreateVacanciesResponse> {
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
