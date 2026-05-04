import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse, ApiProperty} from "@nestjs/swagger";
import {GetOneLanguagePublicResponse} from "@/features/library/language/Public/queries/get-one-language/get-one-language-public.response";
import {GetOneLanguagePublicQuery} from "@/features/library/language/Public/queries/get-one-language/get-one-language-public.query";
import {GetAllLanguagePublicResponse} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.response";
import {GetAllLanguagePublicFilters} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.filters";
import {GetAllLanguagePublicQuery} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.query";

@Controller('public/language')
export class LanguagePublicController {
    constructor(private readonly queriesBus : QueryBus) {
    }

    @Get(':id')
    @ApiOkResponse({type : GetOneLanguagePublicResponse})
    async getOneLanguage(@Param('id',ParseIntPipe)id : number) {
        return await this.queriesBus.execute(new GetOneLanguagePublicQuery(id))
    }

    @Get()
    @ApiProperty({type : [GetAllLanguagePublicResponse]})
    async getAllLanguage(@Query() filters : GetAllLanguagePublicFilters) {
        return await this.queriesBus.execute(new GetAllLanguagePublicQuery(filters))
    }

}