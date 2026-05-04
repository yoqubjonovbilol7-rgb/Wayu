import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllVacanciesPublicQuery } from './queries/get-all-vacancies/get-all-vacancies.query';
import { GetAllVacanciesPublicResponse } from './queries/get-all-vacancies/get-all-vacancies.response';
import { GetAllVacanciesPublicFilters } from './queries/get-all-vacancies/get-all-vacancies.filters';
import { GetOneVacancyPublicQuery } from './queries/get-one-vacancies/get-one-vacancies.query';
import { GetOneVacancyPublicResponse } from './queries/get-one-vacancies/get-one-vacancies.response';

@Controller('public/vacancies')
export class VacanciesPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: GetAllVacanciesPublicResponse })
  async getAll(@Query() filters: GetAllVacanciesPublicFilters) {
    return this.queryBus.execute(new GetAllVacanciesPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacancyPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneVacancyPublicQuery(id));
  }
}