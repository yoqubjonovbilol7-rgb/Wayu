import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiOkResponse} from "@nestjs/swagger";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.response";
import {GetAllNewsCategoriesFilters} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.filters";
import {GetAllNewsCategoriesQuery} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.query";
import {DeleteNewsCategoryCommand} from "@/features/news/news-category/Admin/commands/delete-news-category/delete-news-category.command";
import {GetOneNewsCategoryAdminResponse} from "@/features/news/news-category/Admin/queries/get-one-news-category/get-one-news-category-admin.response";
import {GetOneNewsCategoryAdminQuery} from "@/features/news/news-category/Admin/queries/get-one-news-category/get-one-news-category-admin.query";
import {Roles} from "@/core/decorators/roles.decorator";
import {Role} from "@/core/enums/role.enum";
import {CreateNewsCategoryResponse} from "@/features/news/news-category/Admin/commands/create-news-category/create-news-category.response";
import {CreateNewsCategoryRequest} from "@/features/news/news-category/Admin/commands/create-news-category/create-news-category.request";
import {CreateNewsCategoryCommand} from "@/features/news/news-category/Admin/commands/create-news-category/create-news-category.command";


@Controller('news-categories')
@Roles(Role.Admin,Role.SuperAdmin)
export class NewsCategoryAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {
    }

    @Get()
    @ApiOkResponse({type: [GetAllNewsCategoriesResponse]})
    async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters) {
        return await this.queriesBus.execute(new GetAllNewsCategoriesQuery(filters));
    }


    @Delete(':id')
    async deleteNewsCategory(@Param('id', ParseIntPipe) id: number) {
        return await this.commandBus.execute(new DeleteNewsCategoryCommand(id));
    }

    @Patch(':id')
    @ApiOkResponse({type : [GetOneNewsCategoryAdminResponse]})
    async getOneNewsCategory(@Param('id',ParseIntPipe)id : number) {
        return this.queriesBus.execute(new GetOneNewsCategoryAdminQuery(id))
    }

    @Post()
    @ApiOkResponse({type : [CreateNewsCategoryResponse]})
    async createNewsCategory(@Body() cmd : CreateNewsCategoryRequest){
      return this.commandBus.execute(new CreateNewsCategoryCommand(cmd.title))
    }

  @Get(':id')
  async getOne(@Param('id',ParseIntPipe)id : number){
      return await this.queriesBus.execute(new GetOneNewsCategoryAdminQuery(id))
  }


}