import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {GetOneVacanciesQuery} from "@/features/careers/vacancies/Admin/queries/get-one-vacancies/get-one-vacancies.query";
import {Vacancies} from "@/features/careers/vacancies/vacancies.entity";
import {GetOneVacanciesResponse} from "@/features/careers/vacancies/Admin/queries/get-one-vacancies/get-one-vacancies.response";

@QueryHandler(GetOneVacanciesQuery)
export class GetOneVacanciesHandler implements IQueryHandler<GetOneVacanciesQuery> {

    async execute(query: GetOneVacanciesQuery): Promise<GetOneVacanciesResponse> {
        const vacancy = await Vacancies.findOne({where: { id: query.id }});
        if (!vacancy) {
            throw new NotFoundException(`Vacancy with id ${query.id} not found`);
        }

        return plainToInstance(GetOneVacanciesResponse, vacancy, {excludeExtraneousValues: true});
    }
}
