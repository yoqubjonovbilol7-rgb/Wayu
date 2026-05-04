import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllApplicationsPublicQuery } from './queries/get-all-applications/get-all-applications.query';
import { GetAllApplicationsPublicResponse } from './queries/get-all-applications/get-all-applications.response';
import { GetAllApplicationsPublicFilters } from './queries/get-all-applications/get-all-applications.filters';
import { GetOneApplicationPublicQuery } from './queries/get-one-applications/get-one-applications.query';
import { GetOneApplicationPublicResponse } from './queries/get-one-applications/get-one-applications.response';

@Controller('public/applications')
export class ApplicationsPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: GetAllApplicationsPublicResponse })
  async getAll(@Query() filters: GetAllApplicationsPublicFilters) {
    return this.queryBus.execute(new GetAllApplicationsPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneApplicationPublicQuery(id));
  }
}