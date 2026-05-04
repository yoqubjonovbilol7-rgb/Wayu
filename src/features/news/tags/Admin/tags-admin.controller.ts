import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";

import { DeleteTagsCommand } from "@/features/news/tags/Admin/command/delete-tags/delete-tags.command";
import { GetOneTagsAdminQuery } from "@/features/news/tags/Admin/queries/get-one-tags/get-one-tags-admin.query";
import { GetOneTagsAdminResponse } from "@/features/news/tags/Admin/queries/get-one-tags/get-one-tags-admin.response";
import { CreateTagsCommand } from "@/features/news/tags/Admin/command/create-tags/create-tags.command";
import { GetAllTagsQuery } from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.query";
import { UpdateTagsRequest } from "@/features/news/tags/Admin/command/update-tags/update-tags.request";
import { GetAllTagsFilters } from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.filters";
import { UpdateTagsCommand } from "@/features/news/tags/Admin/command/update-tags/update-tags.command";
import { CreateTagsRequest } from "@/features/news/tags/Admin/command/create-tags/create-tags.request";
import { GetAllTagsResponse } from "@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.response";
import { CreateTagsResponse } from "@/features/news/tags/Admin/command/create-tags/create-tags.response";

@Controller('admin/tags')
export class TagsAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllTagsResponse] })
    async getAllTags(@Query() filters: GetAllTagsFilters) {
        return this.queryBus.execute(new GetAllTagsQuery(filters));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateTagsResponse })
    async createTag(@Body() dto: CreateTagsRequest) {
        return this.commandBus.execute(
            new CreateTagsCommand(dto.title),
        );
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneTagsAdminResponse })
    async getOneTag(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(
            new GetOneTagsAdminQuery(id),
        );
    }

    @Patch(':id')
    async updateTag(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTagsRequest,
    ) {
        return this.commandBus.execute(
            new UpdateTagsCommand(id, dto.title),
        );
    }

    @Delete(':id')
    async deleteTag(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(
            new DeleteTagsCommand(id),
        );
    }
}