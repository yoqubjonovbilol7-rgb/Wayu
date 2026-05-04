import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.response";
import {GetAllNewsCategoriesFilters} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.filters";
import {GetAllNewsCategoriesQuery} from "@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.query";
import {CreateNewsCategoryResponse} from "@/features/news/news-category/Admin/commands/create-news-category/create-news-category.response";
import {CreateNewsCategoryCommand} from "@/features/news/news-category/Admin/commands/create-news-category/create-news-category.command";
import {DeleteNewsCategoryCommand} from "@/features/news/news-category/Admin/commands/delete-news-category/delete-news-category.command";
import {GetOneNewsCategoryAdminResponse} from "@/features/news/news-category/Admin/queries/get-one-news-category/get-one-news-category-admin.response";
import {GetOneNewsCategoryAdminQuery} from "@/features/news/news-category/Admin/queries/get-one-news-category/get-one-news-category-admin.query";
import {UpdateNewsCategoryRequest} from "@/features/news/news-category/Admin/commands/update-news-category/update-news-category.request";
import {CreateNewsCategoryRequest} from "@/features/news/news-category/Admin/commands/create-news-category/create-news-category.request";
import {UpdateNewsCategoryCommand} from "@/features/news/news-category/Admin/commands/update-news-category/update-news-category.command";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as fs from "fs";
import * as path from "path";

@Controller('admin/news-category')
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

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const dest = './uploads/news-category';
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest, { recursive: true });
                }
                cb(null, dest);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const uniqueName = `news-category_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
                cb(null, uniqueName);
            }
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
                return cb(new Error('Only image files are allowed'), false);
            }
            cb(null, true);
        }
    }))
    @ApiCreatedResponse({ type: CreateNewsCategoryResponse })
    async createNewsCategory(@Body() body: CreateNewsCategoryRequest, @UploadedFile() file?: Express.Multer.File) {
        const imagePath = file ? `/uploads/news-category/${file.filename}` : undefined;
        return await this.commandBus.execute(new CreateNewsCategoryCommand(body.title, imagePath));
    }

    @Delete(':id')
    async deleteNewsCategory(@Param('id', ParseIntPipe) id: number) {
        return await this.commandBus.execute(new DeleteNewsCategoryCommand(id));
    }

    @Get(':id')
    @ApiOkResponse({type : [GetOneNewsCategoryAdminResponse]})
    async getOneNewsCategory(@Param('id',ParseIntPipe)id : number) {
        return this.queriesBus.execute(new GetOneNewsCategoryAdminQuery(id))
    }


    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const dest = './uploads/news-category';
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest, { recursive: true });
                }
                cb(null, dest);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const uniqueName = `news-category_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
                cb(null, uniqueName);
            }
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
                return cb(new Error('Only image files are allowed'), false);
            }
            cb(null, true);
        }
    }))
    async updateNewsCategory(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateNewsCategoryRequest, @UploadedFile() file?: Express.Multer.File){
        const imagePath = file ? `/uploads/news-category/${file.filename}` : undefined;
        return await this.commandBus.execute(new UpdateNewsCategoryCommand(id, body.title, imagePath));
    }

}