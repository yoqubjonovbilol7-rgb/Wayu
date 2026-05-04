import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {CreateBookCategoryResponse} from "@/features/library/bookCategory/Admin/commands/create-book-category/create-book-category.response";
import {GetAllBookCategoryFilters} from "@/features/library/bookCategory/Admin/queries/get-all-book-category/get-all-book-category.filters";
import {GetAllBookCategoryQuery} from "@/features/library/bookCategory/Admin/queries/get-all-book-category/get-all-book-category.query";
import {DeleteBookCategoryCommand} from "@/features/library/bookCategory/Admin/commands/delete-book-category/delete-book-category.command";
import {UpdateBookCategoryCommand} from "@/features/library/bookCategory/Admin/commands/update-book-category/update-book-category.command";
import {GetOneBookCategoryQuery} from "@/features/library/bookCategory/Admin/queries/get-one-book-category/get-one-book-category.query";
import {CreateBookCategoryRequest} from "@/features/library/bookCategory/Admin/commands/create-book-category/create-book-category.request";
import {
    CreateBookCategoryCommand
} from "@/features/library/bookCategory/Admin/commands/create-book-category/create-book-category.command";
import {
    UpdateBookCategoryRequest
} from "@/features/library/bookCategory/Admin/commands/update-book-category/update-book-category.request";
import {
    UpdateBookCategoryResponse
} from "@/features/library/bookCategory/Admin/commands/update-book-category/update-book-category.response";


@Controller('admin/BookCategory')
export class BookCategoryAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private  readonly queriesBus: QueryBus
    ) {}

    @Post()
    @ApiOkResponse({type : CreateBookCategoryResponse})
    async createBookCategory(@Body() cmd : CreateBookCategoryRequest){
        return await this.commandBus.execute(new CreateBookCategoryCommand(cmd.title))
    }

    @Get()
    async getAllBookCategory(@Query() filters : GetAllBookCategoryFilters){
        return await this.queriesBus.execute(new GetAllBookCategoryQuery(filters))
    }

    @Delete(':id')
    async deleteBookCategory(@Param('id',ParseIntPipe)id : number){
        const cmd = new DeleteBookCategoryCommand()
        cmd.id = id;
        return await this.commandBus.execute(cmd)
    }

    @Patch(':id')
    async updateBookCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateBookCategoryRequest): Promise<UpdateBookCategoryResponse> {

        return await this.commandBus.execute(new UpdateBookCategoryCommand(id, request.title));
    }

    @Get(':id')
    async getOneBookCategory(@Param('id',ParseIntPipe)id : number){
        return await this.queriesBus.execute(new GetOneBookCategoryQuery(id))
    }
}