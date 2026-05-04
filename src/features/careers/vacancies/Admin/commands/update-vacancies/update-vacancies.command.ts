import {Command} from "@nestjs/cqrs";
import {UpdateVacanciesResponse} from "@/features/careers/vacancies/Admin/commands/update-vacancies/update-vacancies.response";
import {VacancyType} from "@/core/enums/paymentProvider.enum";

export class UpdateVacanciesCommand extends Command<UpdateVacanciesResponse>{
    constructor(
        public id: number,
        public title?: string,
        public address?: string,
        public description?: string,
        public phoneNumber?: string,
        public type?: VacancyType,
        public salary?: string,
        public isActive?: boolean,
    ) {
        super();
    }
}
