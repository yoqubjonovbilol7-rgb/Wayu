import {Body, Controller, Post, UploadedFiles, UseInterceptors, BadRequestException, Get, Param, ParseIntPipe, Query,} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import {ApiConsumes, ApiOkResponse} from "@nestjs/swagger";
import fs from "fs";
import { CreateBookRequest } from "@/features/library/book/Admin/commands/create-book/create-book.request";
import { CreateBookCommand } from "@/features/library/book/Admin/commands/create-book/create-book.command";
import {storageOptions} from "@/config/multer.config";
import {GetOneBookQuery} from "@/features/library/book/Admin/queries/get-one-book/get-one-book.query";
import {GetAllBookFilters} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.filters";
import {GetAllBookResponse} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.response";
import {GetAllBookQuery} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.query";


@Controller("admin/books")
export class BooksController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus) {}

    @Post()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileFieldsInterceptor([{ name: "image"}, { name: "file"},], {storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 }}))
    async create(@Body() payload: CreateBookRequest, @UploadedFiles() files: { image?: Express.Multer.File; file?: Express.Multer.File; },) {

        const image = files?.image?.[0];
        const file = files?.file?.[0];

        if (!image || !file) {
            throw new BadRequestException("Image and file are required");
        }

        const cmd = new CreateBookCommand(
            payload.authorId,
            payload.categoryId,
            payload.title,
            image,
            file,
            payload.pages,
            payload.year,
            payload.description,
        );

        try {
            return await this.commandBus.execute(cmd);
        } catch (exc) {
            if (image?.path && fs.existsSync(image.path)) {
                fs.unlinkSync(image.path);
            }
            if (file?.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw exc;
        }
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(new GetOneBookQuery(id));
    }

    @Get()
    @ApiOkResponse({ type: [GetAllBookResponse] })
    async getAllPublicAuthors(@Query() filters: GetAllBookFilters,) {return this.queryBus.execute(new GetAllBookQuery(filters),);
    }
}