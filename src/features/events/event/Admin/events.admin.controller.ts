import {
    Body,
    Controller,
    Delete, Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, Query,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FileInterceptor } from "@nestjs/platform-express";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";;
import fs from 'fs';
import { CreateEventsCommand } from "@/features/events/event/Admin/commands/create.event/create-events.command";
import {storageOptions} from "@/config/multer.config";
import {CreateEventRequest} from "@/features/events/event/Admin/commands/create.event/create-events.request";
import {DeleteEventCommand} from "@/features/events/event/Admin/commands/delete.event/delete-events.command";
import {UpdateEventCommand} from "@/features/events/event/Admin/commands/update.event/update-events.command";
import {UpdateEventsRequest} from "@/features/events/event/Admin/commands/update.event/update-events.request";
import {GetAllEventsResponse} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.response";
import {GetAllEventsFilters} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.filters";
import {GetAllEventsQuery} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.query";

@Controller('admin/events')
export class EventsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileInterceptor('image', {storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 }})
    )
    async createEvent(@Body() payload: CreateEventRequest, @UploadedFile() image: Express.Multer.File) {
        const cmd = new CreateEventsCommand(
            payload.categoryId,
            payload.title,
            payload.content,
            image,
            payload.date,
            payload.address
        );

        try {
            return await this.commandBus.execute(cmd);
        } catch (exc) {
            if (image && image.path && fs.existsSync(image.path)) {
                fs.rmSync(image.path);
            }
            throw exc;
        }
    }

    @Delete(':id')
    async deleteEvent(@Param('id',ParseIntPipe)id : number){
        return await this.commandBus.execute(new DeleteEventCommand(id))
    }

    @Patch(':id')
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
    async updateEvent(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateEventsRequest,
        @UploadedFile() image?: Express.Multer.File
    ) {

        const cmd = new UpdateEventCommand(
            id,
            payload.categoryId!,
            payload.title!,
            payload.content!,
            image,
            payload.date!,
            payload.address!
        );

        try {
            return await this.commandBus.execute(cmd);
        } catch (exc) {
            if (image && fs.existsSync(image.path)) {
                fs.unlinkSync(image.path);
            }
            throw exc;
        }
    }

    @Get()
    @ApiOkResponse({type :GetAllEventsResponse})
    async getALlEvents(@Query() filters : GetAllEventsFilters) {
        return await this.queryBus.execute(new GetAllEventsQuery(filters))
    }

}