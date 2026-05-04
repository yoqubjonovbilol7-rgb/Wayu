import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse, ApiProperty} from "@nestjs/swagger";
import {CreateLanguageResponse} from "@/features/library/language/Admin/commands/create-language/create-language.response";
import {DeleteLanguageCommand} from "@/features/library/language/Admin/commands/delete-language/delete-language.command";
import {GetAllLanguageResponse} from "@/features/library/language/Admin/queries/get-all-language/get-all-language.response";
import {GetAllLanguageFilters} from "@/features/library/language/Admin/queries/get-all-language/get-all-language.filters";
import {GetAllLanguageQuery} from "@/features/library/language/Admin/queries/get-all-language/get-all-language.query";
import {UpdateLanguageResponse} from "@/features/library/language/Admin/commands/update-language/update-language.response";
import {GetOneLanguageResponse} from "@/features/library/language/Admin/queries/get-one-language/get-one-language.response";
import {GetOneLanguageQuery} from "@/features/library/language/Admin/queries/get-one-language/get-one-language.query";
import {CreateLanguageRequest} from"@/features/library/language/Admin/commands/create-language/create-language.request";
import {UpdateLanguageRequest} from "@/features/library/language/Admin/commands/update-language/update-language.request";
import {
    UpdateLanguageCommand
} from "@/features/library/language/Admin/commands/update-language/update-language.command";
import {
    CreateLanguageCommand
} from "@/features/library/language/Admin/commands/create-language/create-language.command";

@Controller('admin/language')
export class LanguageAdminController {
    constructor(
        private readonly commandBus : CommandBus,
        private readonly queriesBus : QueryBus
    ) {}


    @Get()
    @ApiProperty({type : [GetAllLanguageResponse]})
    async getAllLanguage(@Query() filters : GetAllLanguageFilters) {
        return await this.queriesBus.execute(new GetAllLanguageQuery(filters))
    }

    @Post()
    @ApiOkResponse({ type: CreateLanguageResponse })
    async createLanguage(@Body() cmd: CreateLanguageRequest) {
        return await this.commandBus.execute(new CreateLanguageCommand(cmd.title));
    }

    @Delete(':id')
    async deleteLanguage(@Param('id',ParseIntPipe)id : number){
        const cmd = new DeleteLanguageCommand();
        cmd.id = id
        return await this.commandBus.execute(cmd)
    }

    @Patch(':id')
    async updateLanguage(@Param('id', ParseIntPipe) id: number, @Body() request: UpdateLanguageRequest): Promise<UpdateLanguageResponse> {
        return await this.commandBus.execute(
            new UpdateLanguageCommand(id,request.title)
        );
    }

    @Get(':id')
    @ApiOkResponse({type : GetOneLanguageResponse})
    async getOneLanguage(@Param('id',ParseIntPipe)id : number){
        return await this.queriesBus.execute(new GetOneLanguageQuery(id))
    }

}