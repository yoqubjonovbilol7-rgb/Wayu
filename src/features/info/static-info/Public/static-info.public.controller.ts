import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllStaticInfoPublicQuery } from './queries/get-all-static-info/get-all-static-info.query';
import { GetAllStaticInfoPublicFilters } from './queries/get-all-static-info/get-all-static-info.filters';
import { GetOneStaticInfoPublicQuery } from './queries/get-one-static-info/get-one-static-info.query';
import { GetOneStaticInfoPublicResponse } from './queries/get-one-static-info/get-one-static-info.response';

@Controller('public/static-info')
export class StaticInfoPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: GetOneStaticInfoPublicResponse })
  async getAll(@Query() filters: GetAllStaticInfoPublicFilters) {
    return this.queryBus.execute(new GetAllStaticInfoPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneStaticInfoPublicQuery(id));
  }
}