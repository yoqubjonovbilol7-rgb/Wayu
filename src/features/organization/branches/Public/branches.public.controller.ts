import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllBranchesPublicQuery } from './queries/get-all-branches/get-all-branches.query';
import { GetAllBranchesPublicResponse } from './queries/get-all-branches/get-all-branches.response';
import { GetAllBranchesPublicFilters } from './queries/get-all-branches/get-all-branches.filters';
import { GetOneBranchPublicQuery } from './queries/get-one-branches/get-one-branches.query';
import { GetOneBranchPublicResponse } from './queries/get-one-branches/get-one-branches.response';

@Controller('public/branches')
export class BranchesPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllBranchesPublicResponse] })
  async getAll(@Query() filters: GetAllBranchesPublicFilters) {
    return this.queryBus.execute(new GetAllBranchesPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneBranchPublicQuery(id));
  }
}
