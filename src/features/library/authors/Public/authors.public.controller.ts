import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {GetAllAuthorsPublicResponse} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.response";
import {GetAllAuthorsPublicFilters} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.filters";
import {GetAllAuthorsPublicQuery} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.query";
import {GetOneAuthorsPublicQuery} from "@/features/library/authors/Public/queries/get-one-authors/get-one-authors-public.query";

@Controller('public/authors')
export class AuthorsPublicController  {
    constructor(private readonly queriesBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type : [GetAllAuthorsPublicResponse]})
    async getAllPublicAuthors(@Query() filters : GetAllAuthorsPublicFilters) {
        return await this.queriesBus.execute(new GetAllAuthorsPublicQuery(filters))
    }

    @Get(':id')
    async geOnePublicAuthors(@Param('id',ParseIntPipe) id : number){
        return await this.queriesBus.execute(new GetOneAuthorsPublicQuery(id))
    }

}