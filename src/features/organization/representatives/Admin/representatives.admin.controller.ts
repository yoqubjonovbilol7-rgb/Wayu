import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {storageOptions} from "@/config/multer.config";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateRepresentativesRequest} from "@/features/organization/representatives/Admin/commands/create-representatives/create-representatives.request";
import {CreateRepresentativesCommand} from "@/features/organization/representatives/Admin/commands/create-representatives/create-representatives.command";
import {DeleteRepresentativesCommand} from "@/features/organization/representatives/Admin/commands/delete-representatives/delete-representatives.command";
import {GetAllRepresentativesQuery} from "@/features/organization/representatives/Admin/queries/get-all-representatives/get-all-representatives.query";
import {GetAllRepresentativesFilters} from "@/features/organization/representatives/Admin/queries/get-all-representatives/get-all-representatives.filters";
import {GetOneRepresentativesQuery} from "@/features/organization/representatives/Admin/queries/get-one-representatives/get-one-representatives.query";
import {GetAllRepresentativesResponse} from "@/features/organization/representatives/Admin/queries/get-all-representatives/get-all-representatives.response";
import {GetOneRepresentativesResponse} from "@/features/organization/representatives/Admin/queries/get-one-representatives/get-one-representatives.response";
import fs from "fs";


@Controller('admin/representatives')
export class RepresentativesAdminController {
    constructor(
        private readonly  commandBus : CommandBus,
        private readonly queryBus : QueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new representative' })
    @ApiCreatedResponse()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
    async createRepresentatives(@Body() payload : CreateRepresentativesRequest,
                                @UploadedFile() image : Express.Multer.File){
        let cmd = new CreateRepresentativesCommand(
            payload.fullName,
            image,
            payload.email,
            payload.phoneNumber,
            payload.resume,
        )
        try {
            return await this.commandBus.execute(cmd);
        } catch (exc) {
            if (fs.existsSync(image.path))
                fs.rmSync(image.path);
            throw exc;
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all representatives' })
    @ApiOkResponse({ type: GetAllRepresentativesResponse })
    async getAllRepresentatives(@Query() filters: GetAllRepresentativesFilters) {
        return this.queryBus.execute(new GetAllRepresentativesQuery(filters));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single representative' })
    @ApiOkResponse({ type: GetOneRepresentativesResponse })
    @ApiNotFoundResponse()
    async getOneRepresentative(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(new GetOneRepresentativesQuery(id));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a representative' })
    async deleteRepresentative(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(new DeleteRepresentativesCommand(id));
    }
}
