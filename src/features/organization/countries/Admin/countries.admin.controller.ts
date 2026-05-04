import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Delete,
    Patch,
    UploadedFile,
    UseInterceptors,
    Query
} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import * as fs from 'fs';
import { storageOptions } from "@/config/multer.config";
import {UpdateCountriesCommand} from "@/features/organization/countries/Admin/commands/update-counries/update-countries.command";
import {DeleteCountriesCommand} from "@/features/organization/countries/Admin/commands/delete-counries/delete-countries.command";
import {GetOneCountriesQuery} from "@/features/organization/countries/Public/queries/get-one-counries/get-one-countries.query";
import {GetAllCountriesQuery} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.query";
import {GetAllCountriesFilters} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.filters";
import {GetAllCountriesResponse
} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.response";
import {CreateCountriesCommand} from "@/features/organization/countries/Admin/commands/create-counries/create-countries.command";
import {CreateCountriesRequest} from "@/features/organization/countries/Admin/commands/create-counries/create-countries.request";
import {UpdateCountriesRequest} from "@/features/organization/countries/Admin/commands/update-counries/update-countries.request";

@Controller('admin/countries')
export class CountriesAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus
    ) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('flag', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 } }))
    async create(
        @Body() payload: CreateCountriesRequest,
        @UploadedFile() file: Express.Multer.File
    ) {

        const cmd = new CreateCountriesCommand(
            payload.title, file);

        try {
            return await this.commandBus.execute(cmd);
        } catch (error) {
            this.removeFile(file);
            throw error;
        }
    }

    @Get()
    @ApiOkResponse({ type: GetAllCountriesResponse })
    async getAllCountries(@Query() filters: GetAllCountriesFilters) {
        return await this.queriesBus.execute(new GetAllCountriesQuery(filters));
    }

    @Get(':id')
    async getOneCountry(@Param('id', ParseIntPipe) id: number) {
        return await this.queriesBus.execute(new GetOneCountriesQuery(id));
    }

    @Delete(':id')
    async deleteCountries(@Param('id', ParseIntPipe) id: number) {
        return await this.commandBus.execute(new DeleteCountriesCommand(id));
    }

    @Patch(':id')
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('flag', {
        storage: storageOptions,
        limits: { fileSize: 1024 * 1024 * 5 }
    }))
    async updateCountry(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCountriesRequest,
        @UploadedFile() flag?: Express.Multer.File
    ) {
        const cmd = new UpdateCountriesCommand(id, payload.title, flag);

        try {
            return await this.commandBus.execute(cmd);
        } catch (exc) {
            this.removeFile(flag);
            throw exc;
        }
    }

    private removeFile(file?: Express.Multer.File) {
        if (file && file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    }
}