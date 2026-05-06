import {Body, Controller, Post, Get, Param, Delete, ParseIntPipe, Patch, Query} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {ApiResponse } from '@nestjs/swagger';

import {CreateUsefulLinksResponse} from "@/features/info/useful-links/Admin/commands/create-useful-links/create-useful-links.response";
import {CreateUsefulLinksRequest} from "@/features/info/useful-links/Admin/commands/create-useful-links/create-useful-links.request";
import {CreateUsefulLinksCommand} from "@/features/info/useful-links/Admin/commands/create-useful-links/create-useful-links.command";
import {DeleteUsefulLinksCommand} from "@/features/info/useful-links/Admin/commands/delete-useful-links/delete-useful-links.command";
import {UpdateUsefulLinksRequest} from "@/features/info/useful-links/Admin/commands/update-useful-links/update-useful-links.request";
import {UpdateUsefulLinksCommand} from "@/features/info/useful-links/Admin/commands/update-useful-links/update-useful-links.command";
import {GetAllUsefulLinksFilters} from "@/features/info/useful-links/Admin/queries/get-all-social-links/get-all-useful-links.filters";
import {GetAllUsefulLinksQuery} from "@/features/info/useful-links/Admin/queries/get-all-social-links/get-all-useful-links.query";
import {GetOneUsefulLinkQuery} from "@/features/info/useful-links/Admin/queries/get-one-social-links/get-one-useful-links.query";



@Controller('admin/useful-links')
export class UsefulLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ type: CreateUsefulLinksResponse })
  async create(@Body() cmd: CreateUsefulLinksRequest) {
    return this.commandBus.execute(new CreateUsefulLinksCommand(cmd.title, cmd.icon, cmd.link));
  }

  @Delete(':id')
  async deleteLinks(@Param('id',ParseIntPipe)id : number){
    return await this.commandBus.execute(new DeleteUsefulLinksCommand(id))
  }

  @Patch(':id') async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsefulLinksRequest,) {
    return this.commandBus.execute(new UpdateUsefulLinksCommand(id, dto.title, dto.icon, dto.link));
  }

  @Get()
  async getAll(@Query() filters: GetAllUsefulLinksFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinksQuery(filters),);
  }

  @Get(':id')
  async getOne(@Param('id',ParseIntPipe)id : number){
    return await this.queryBus.execute(new GetOneUsefulLinkQuery(id))
  }
}