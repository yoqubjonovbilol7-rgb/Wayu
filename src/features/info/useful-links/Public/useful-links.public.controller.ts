import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllUsefulLinksPublicQuery } from './queries/get-all-useful-links/get-all-useful-links.query';
import {  UsefulLinkPublicResponse } from './queries/get-all-useful-links/get-all-useful-links.response';
import { GetAllUsefulLinksPublicFilters } from './queries/get-all-useful-links/get-all-useful-links.filters';
import { GetOneUsefulLinkPublicQuery } from './queries/get-one-useful-links/get-one-useful-links.query';
import { GetOneUsefulLinkPublicResponse } from './queries/get-one-useful-links/get-one-useful-links.response';

@Controller('public/useful-links')
export class UsefulLinksPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: UsefulLinkPublicResponse  })
  async getAll(@Query() filters: GetAllUsefulLinksPublicFilters) {
    return this.queryBus.execute(new GetAllUsefulLinksPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinkPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneUsefulLinkPublicQuery(id));
  }
}