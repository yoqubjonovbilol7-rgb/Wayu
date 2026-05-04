import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import { CreateStaticInfoCommand } from './command/create-static-info/create-static-info.command';
import {ApiOkResponse} from '@nestjs/swagger';
import {CreateStaticInfoRequest} from "@/features/info/static-info/Admin/command/create-static-info/create-static-info.request";
import {CreateStaticInfoResponse} from "@/features/info/static-info/Admin/command/create-static-info/create-static-info.response";
import {DeleteStaticCommand} from "@/features/info/static-info/Admin/command/delete-static-info/delete-static.command";
import {UpdateStaticInfoRequest} from "@/features/info/static-info/Admin/command/update-static-info/update-static-info.request";
import {UpdateStaticInfoCommand} from "@/features/info/static-info/Admin/command/update-static-info/update-static-info.command";
import {GetAllStaticInfoResponse} from "@/features/info/static-info/Admin/queries/get-all-static-info/get-all-static-info.response";
import {GetAllStaticInfoFilters} from "@/features/info/static-info/Admin/queries/get-all-static-info/get-all-static-info.filters";
import {GetAllStaticInfoQuery} from "@/features/info/static-info/Admin/queries/get-all-static-info/get-all-static-info.query";


@Controller('admin/static-info')
export class StaticInfoAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queriesBus : QueryBus
    ) {}

  @Post()
  @ApiOkResponse({type : CreateStaticInfoResponse})
  async create(@Body() cmd: CreateStaticInfoRequest) {
    return await this.commandBus.execute(new CreateStaticInfoCommand(cmd.appStoreLink,cmd.playMarketLink,cmd.aboutUs));
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteStaticCommand(id));
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() cmd: UpdateStaticInfoRequest,) {
    return this.commandBus.execute(new UpdateStaticInfoCommand(id, cmd.appStoreLink, cmd.playMarketLink, cmd.aboutUs,),);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllStaticInfoResponse] })
  async getAllStaticInfo(@Query() filters: GetAllStaticInfoFilters) {
    return await this.queriesBus.execute(new GetAllStaticInfoQuery(filters),);
  }
}