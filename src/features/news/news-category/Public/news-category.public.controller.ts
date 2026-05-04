import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {GetAllNewsCategoriesFilters} from "@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.filters";
import {ApiOkResponse, ApiResponse} from "@nestjs/swagger";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.response";
import {QueryBus} from "@nestjs/cqrs";
import {GetAllNewsCategoriesPublicQuery} from "@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.query";
import {GetOneNewsCategoryResponse} from "@/features/news/news-category/Public/queries/get-one-news-category/get-one-news-category.response";
import {GetOneNewsCategoryQuery} from "@/features/news/news-category/Public/queries/get-one-news-category/get-one-news-category.query";

@Controller('public/news-category')
export class NewsCategoryPublicController {

    constructor(
        private  readonly  queriesBus : QueryBus
    ) {}

    @Get()
    @ApiOkResponse({type: [GetAllNewsCategoriesResponse]})
    async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters){
        return await this.queriesBus.execute(new GetAllNewsCategoriesPublicQuery(filters))
    }

    @Get(':id')
    @ApiResponse({type: [GetOneNewsCategoryResponse]})
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetOneNewsCategoryResponse> {
        return this.queriesBus.execute(new GetOneNewsCategoryQuery(id));
    }
}