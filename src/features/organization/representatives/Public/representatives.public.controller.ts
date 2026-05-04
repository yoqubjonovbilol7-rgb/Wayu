import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllRepresentativesPublicQuery } from './queries/get-all-representatives/get-all-representatives.query';
import { GetAllRepresentativesPublicResponse } from './queries/get-all-representatives/get-all-representatives.response';
import { GetAllRepresentativesPublicFilters } from './queries/get-all-representatives/get-all-representatives.filters';
import { GetOneRepresentativePublicQuery } from './queries/get-one-representatives/get-one-representatives.query';
import { GetOneRepresentativePublicResponse } from './queries/get-one-representatives/get-one-representatives.response';

@Controller('public/representatives')
export class RepresentativesPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: GetAllRepresentativesPublicResponse })
  async getAll(@Query() filters: GetAllRepresentativesPublicFilters) {
    return this.queryBus.execute(new GetAllRepresentativesPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativePublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneRepresentativePublicQuery(id));
  }
}