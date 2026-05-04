import { Command } from '@nestjs/cqrs';
import { CreateVacanciesResponse } from './create-vacancies.response';
import { VacancyType } from '@/core/enums/paymentProvider.enum';

export class CreateVacanciesCommand extends Command<CreateVacanciesResponse> {
  constructor(
    public title: string,
    public address: string,
    public description: string,
    public phoneNumber: string,
    public type: VacancyType,
    public salary: string,
  ) {
    super();
  }
}