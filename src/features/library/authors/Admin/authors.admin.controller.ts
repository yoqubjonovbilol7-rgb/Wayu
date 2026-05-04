import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiOkResponse} from "@nestjs/swagger";
import {CreateAuthorsResponse} from "@/features/library/authors/Admin/commands/create-authors/create-authors.response";
import {CreateAuthorsCommand} from "@/features/library/authors/Admin/commands/create-authors/create-authors.command";
import {GetAllAuthorsResponse} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.response";
import {GetAllAuthorsFilters} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.filters";
import {GetAllAuthorsQuery} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.query";
import {DeleteAuthorsCommand} from "@/features/library/authors/Admin/commands/delete-authors/delete-authors.command";
import {UpdateAuthorsCommand} from "@/features/library/authors/Admin/commands/update-authors/update-authors.command";
import {GetOneAuthorsQuery} from "@/features/library/authors/Admin/queries/get-one-authors/get-one-authors.query";
import {UpdateAuthorsRequest} from "@/features/library/authors/Admin/commands/update-authors/update-authors.request";
import {CreateAuthorsRequest} from "@/features/library/authors/Admin/commands/create-authors/create-authors.request";

@Controller('admin/author')
export class AuthorsAdminController {
    constructor(
        private readonly commandBus : CommandBus,
        private readonly queriesBus : QueryBus) {
    }

    @Post()
    @ApiOkResponse({type : CreateAuthorsResponse})
    async createAuthors(@Body()command : CreateAuthorsRequest) {
        return await this.commandBus.execute(new CreateAuthorsCommand(command.fullName))
    }

    @Get()
    @ApiOkResponse({type : [GetAllAuthorsResponse]})
    async getAllAuthors(@Query() filters : GetAllAuthorsFilters ){
        return await this.queriesBus.execute(new GetAllAuthorsQuery(filters))
    }

    @Delete(':id')
    async deleteAuthors(@Param('id',ParseIntPipe) id :number) {
        const cmd = new DeleteAuthorsCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd)
    }

    @Patch(':id')
    async updateAuthors(@Param('id', ParseIntPipe) id: number, @Body() cmd: UpdateAuthorsRequest){
        return await this.commandBus.execute(new UpdateAuthorsCommand(id ,cmd.fullName));
    }

    @Get(':id')
    async getOneAuthors(@Param('id',ParseIntPipe)id : number) {
        return await this.queriesBus.execute(new GetOneAuthorsQuery(id))
    }

}