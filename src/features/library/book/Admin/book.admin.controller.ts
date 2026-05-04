import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {GetAllBooksResponse} from "./queries/get-all-books/get-all-books.response";
import {GetAllBooksFilters} from "./queries/get-all-books/get-all-books.filters";
import {GetAllBooksQuery} from "./queries/get-all-books/get-all-books.query";
import {CreateBooksResponse} from "./commands/create-books/create-books.response";
import {CreateBooksCommand} from "./commands/create-books/create-books.command";
import {DeleteBooksCommand} from "./commands/delete-books/delete-books.command";
import {GetOneBooksAdminResponse} from "./queries/get-one-books/get-one-books-admin.response";
import {GetOneBooksAdminQuery} from "./queries/get-one-books/get-one-books-admin.query";
import {UpdateBooksRequest} from "./commands/update-books/update-books.request";
import {CreateBooksRequest} from "./commands/create-books/create-books.request";
import {UpdateBooksCommand} from "./commands/update-books/update-books.command";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as fs from "fs";
import * as path from "path";

@Controller('admin/books')
export class BooksAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {
    }

    @Get()
    @ApiOkResponse({type: GetAllBooksResponse})
    async getAllBooks(@Query() filters: GetAllBooksFilters) {
        return await this.queriesBus.execute(new GetAllBooksQuery(filters));
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const dest = './uploads/books';
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    cb(null, dest);
                },
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    const uniqueName = `books_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
                    cb(null, uniqueName);
                }
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    return cb(new Error('Only image files are allowed for image'), false);
                }
                cb(null, true);
            }
        }),
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const dest = './uploads/books';
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    cb(null, dest);
                },
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    const uniqueName = `books_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
                    cb(null, uniqueName);
                }
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                cb(null, true);
            }
        })
    )
    @ApiCreatedResponse({ type: CreateBooksResponse })
    async createBooks(@Body() body: CreateBooksRequest, @UploadedFile('image') imageFile: Express.Multer.File, @UploadedFile('file') fileFile: Express.Multer.File) {
        const imagePath = `/uploads/books/${imageFile.filename}`;
        const filePath = `/uploads/books/${fileFile.filename}`;
        return await this.commandBus.execute(new CreateBooksCommand(body.authorId, body.categoryId, body.title, body.description, body.pages, body.year, imagePath, filePath));
    }

    @Delete(':id')
    async deleteBooks(@Param('id', ParseIntPipe) id: number) {
        return await this.commandBus.execute(new DeleteBooksCommand(id));
    }

    @Get(':id')
    @ApiOkResponse({type: GetOneBooksAdminResponse})
    async getOneBooks(@Param('id',ParseIntPipe)id : number) {
        return this.queriesBus.execute(new GetOneBooksAdminQuery(id))
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const dest = './uploads/books';
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    cb(null, dest);
                },
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    const uniqueName = `books_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
                    cb(null, uniqueName);
                }
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    return cb(new Error('Only image files are allowed for image'), false);
                }
                cb(null, true);
            }
        }),
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const dest = './uploads/books';
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    cb(null, dest);
                },
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    const uniqueName = `books_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
                    cb(null, uniqueName);
                }
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                cb(null, true);
            }
        })
    )
    async updateBooks(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateBooksRequest, @UploadedFile('image') imageFile?: Express.Multer.File, @UploadedFile('file') fileFile?: Express.Multer.File){
        const imagePath = imageFile ? `/uploads/books/${imageFile.filename}` : undefined;
        const filePath = fileFile ? `/uploads/books/${fileFile.filename}` : undefined;
        return await this.commandBus.execute(new UpdateBooksCommand(id, body.authorId, body.categoryId, body.title, body.description, body.pages, body.year, imagePath, filePath));
    }
}