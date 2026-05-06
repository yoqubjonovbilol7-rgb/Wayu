import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateEventsCategoryResponse} from "@/features/events/eventCategory/Admin/commands/create-events-category/create-events-category.response";
import {CreateEventsCategoryRequest} from "@/features/events/eventCategory/Admin/commands/create-events-category/create-events-category.request";
import {CreateEventsCategoryCommand} from "@/features/events/eventCategory/Admin/commands/create-events-category/create-events-category.command";
import {DeleteEventsCategoryCommand} from "@/features/events/eventCategory/Admin/commands/delete-events-category/delete-events-category.command";
import {UpdateEventsCategoryRequest} from "@/features/events/eventCategory/Admin/commands/update-events-category/update-events-category.request";
import {UpdateEventsCategoryCommand} from "@/features/events/eventCategory/Admin/commands/update-events-category/update-events-category.command";
import {GetAllEventsCategoriesResponse} from "@/features/events/eventCategory/Admin/queries/get-all-events-category/get-all-events-category.response";
import {GetAllEventsCategoriesFilters} from "@/features/events/eventCategory/Admin/queries/get-all-events-category/get-all-events-category.filters";
import {GetAllEventsCategoriesQuery} from "@/features/events/eventCategory/Admin/queries/get-all-events-category/get-all-events-category.query";
import {GetOneEventCategoryQuery} from "@/features/events/eventCategory/Admin/queries/get-one-events-category/get-one-event-category.query";
import {GetOneEventCategoryResponse} from "@/features/events/eventCategory/Admin/queries/get-one-events-category/get-one-event-category.response";

@Controller('admin/events-category')
export class EventsCategoryAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {}

    @Post()
    @ApiCreatedResponse({ type: CreateEventsCategoryResponse })
    async createNewsCategory(@Body() cmd : CreateEventsCategoryRequest) {
        return await this.commandBus.execute(new CreateEventsCategoryCommand(cmd.title));
    }


    @Delete(':id')
    async deleteEventsCategory(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteEventsCategoryCommand()
        cmd.id = id;
        return await this.queriesBus.execute(cmd)
    }

    @Patch(':id')
    async updateNewsCategory(@Param('id', ParseIntPipe) id: number, @Body() cmd: UpdateEventsCategoryRequest){
        return await this.commandBus.execute(new UpdateEventsCategoryCommand(id,cmd.title));
    }

    @Get()
    @ApiOkResponse({type: [GetAllEventsCategoriesResponse]})
    async getAllNewsCategories(@Query() filters: GetAllEventsCategoriesFilters) {
        return await this.queriesBus.execute(new GetAllEventsCategoriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneEventCategoryResponse })
    async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.queriesBus.execute(new GetOneEventCategoryQuery(id));
    }
}