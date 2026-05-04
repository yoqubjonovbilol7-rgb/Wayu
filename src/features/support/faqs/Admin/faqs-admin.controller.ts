import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { GetAllFaqsResponse } from '@/features/support/faqs/Admin/queries/get-all-faqs/get-all-faqs.response';
import { GetAllFaqsFilters } from '@/features/support/faqs/Admin/queries/get-all-faqs/get-all-faqs.filters';
import { GetAllFaqsQuery } from '@/features/support/faqs/Admin/queries/get-all-faqs/get-all-faqs.query';

import { CreateFaqsRequest } from '@/features/support/faqs/Admin/command/create-faqs/create-faqs.request';
import { CreateFaqsCommand } from '@/features/support/faqs/Admin/command/create-faqs/create-faqs.command';
import { CreateFaqsResponse } from '@/features/support/faqs/Admin/command/create-faqs/create-faqs.response';

import { UpdateFaqsRequest } from '@/features/support/faqs/Admin/command/update-faqs/update-faqs.request';
import { UpdateFaqsCommand } from '@/features/support/faqs/Admin/command/update-faqs/update-faqs.command';
import { UpdateFaqsResponse } from '@/features/support/faqs/Admin/command/update-faqs/update-faqs.response';

import {GetOneFaqsQuery} from "@/features/support/faqs/Admin/queries/get-one-faqs/get-one-faqs-admin.query";
import {GetOneFaqsResponse} from "@/features/support/faqs/Admin/queries/get-one-faqs/get-one-faqs-admin.response";

import {DeleteFaqsCommand} from "@/features/support/faqs/Admin/command/delete-faqs/delete-faqs.command";



@Controller('admin/faqs')
export class FaqsAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllFaqsResponse] })
    async getAllFaqs(@Query() filters: GetAllFaqsFilters) {
        return this.queryBus.execute(new GetAllFaqsQuery(filters));
    }


    @Post()
    @ApiCreatedResponse({ type: CreateFaqsResponse })
    async createFaq(@Body() body: CreateFaqsRequest) {
        return this.commandBus.execute(new CreateFaqsCommand(body.question, body.answer),);
    }

    @Delete(':id')
    async deleteFaq(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(new DeleteFaqsCommand(id));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneFaqsResponse })
    async getOneFaq(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(new GetOneFaqsQuery(id));
    }

    @Patch(':id')
    @ApiOkResponse({ type: UpdateFaqsResponse })
    async updateFaq(@Param('id', ParseIntPipe) id: number, @Body() cmd: UpdateFaqsRequest,) {
        return this.commandBus.execute(new UpdateFaqsCommand(id, cmd.question, cmd.answer),);
    }
}