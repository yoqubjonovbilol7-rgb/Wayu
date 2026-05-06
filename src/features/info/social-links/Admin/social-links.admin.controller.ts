import {Body, Controller, Post, Get, Param, Delete, Put, ParseIntPipe, Patch, Query} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

import { CreateSocialLinksCommand } from '@/features/info/social-links/Admin/commands/create-social-links/create-social-links.command';
import { CreateSocialLinksResponse } from '@/features/info/social-links/Admin/commands/create-social-links/create-social-links.response';
import {CreateSocialLinksRequest} from "@/features/info/social-links/Admin/commands/create-social-links/create-social-links.request";
import {DeleteSocialLinksCommand} from "@/features/info/social-links/Admin/commands/delete-social-links/delete-social-links.command";
import {UpdateSocialLinksRequest} from "@/features/info/social-links/Admin/commands/update-social-links/update-social-links.request";
import {UpdateSocialLinksCommand} from "@/features/info/social-links/Admin/commands/update-social-links/update-social-links.command";
import {GetAllSocialLinksFilters} from "@/features/info/social-links/Admin/queries/get-all-social-links/get-all-social-links.filters";
import {GetAllSocialLinksQuery} from "@/features/info/social-links/Admin/queries/get-all-social-links/get-all-social-links.query";
import {GetOneSocialLinkQuery} from "@/features/info/social-links/Admin/queries/get-one-social-links/get-one-social-links.query";


@Controller('admin/social-links')
export class SocialLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ type: CreateSocialLinksResponse })
  async create(@Body() cmd: CreateSocialLinksRequest) {
    return this.commandBus.execute(new CreateSocialLinksCommand(cmd.title, cmd.icon, cmd.link));
  }

  @Delete(':id')
  async deleteLinks(@Param('id',ParseIntPipe)id : number){
    return await this.commandBus.execute(new DeleteSocialLinksCommand(id))
  }

  @Patch(':id')
  async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSocialLinksRequest) {
    return this.commandBus.execute(new UpdateSocialLinksCommand(id, dto.title, dto.icon, dto.link),);
  }

  @Get()
  async getAll(@Query() filters : GetAllSocialLinksFilters){
    return await this.queryBus.execute(new GetAllSocialLinksQuery(filters))
  }

  @Get(':id')
  async getOne(@Param('id',ParseIntPipe)id : number){
    return await this.queryBus.execute(new GetOneSocialLinkQuery(id))
  }
}