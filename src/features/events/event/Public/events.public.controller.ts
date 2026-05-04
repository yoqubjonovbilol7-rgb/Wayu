import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllEventsFilters } from './queries/get.all.event/get-all-events.filters';
import { GetAllEventsResponse } from './queries/get.all.event/get-all-events.response';
import { GetAllEventsQuery } from './queries/get.all.event/get-all-events.query';
import { GetOneEventsQuery } from './queries/get.one.event/get-one-events.query';

@Controller('public/events')
export class EventsPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllEventsResponse] })
  async getAll(@Query() filters: GetAllEventsFilters) {
    return this.queryBus.execute(new GetAllEventsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetAllEventsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneEventsQuery(id));
  }
}
