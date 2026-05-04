import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {GetAllInstagramPostsResponse} from "./queries/get-all-instagram-posts/get-all-instagram-posts.response";
import {GetAllInstagramPostsFilters} from "./queries/get-all-instagram-posts/get-all-instagram-posts.filters";
import {GetAllInstagramPostsQuery} from "./queries/get-all-instagram-posts/get-all-instagram-posts.query";
import {CreateInstagramPostsResponse} from "./commands/create-instagram-posts/create-instagram-posts.response";
import {CreateInstagramPostsCommand} from "./commands/create-instagram-posts/create-instagram-posts.command";
import {DeleteInstagramPostsCommand} from "./commands/delete-instagram-posts/delete-instagram-posts.command";
import {GetOneInstagramPostsAdminResponse} from "./queries/get-one-instagram-posts/get-one-instagram-posts-admin.response";
import {GetOneInstagramPostsAdminQuery} from "./queries/get-one-instagram-posts/get-one-instagram-posts-admin.query";
import {UpdateInstagramPostsRequest} from "./commands/update-instagram-posts/update-instagram-posts.request";
import {CreateInstagramPostsRequest} from "./commands/create-instagram-posts/create-instagram-posts.request";
import {UpdateInstagramPostsCommand} from "./commands/update-instagram-posts/update-instagram-posts.command";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as fs from "fs";
import * as path from "path";

@Controller('admin/instagram-posts')
export class InstagramPostsAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {
    }

    @Get()
    @ApiOkResponse({type: GetAllInstagramPostsResponse})
    async getAllInstagramPosts(@Query() filters: GetAllInstagramPostsFilters) {
        return await this.queriesBus.execute(new GetAllInstagramPostsQuery(filters));
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const dest = './uploads/instagram-posts';
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest, { recursive: true });
                }
                cb(null, dest);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const uniqueName = `instagram-posts_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
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
    @ApiCreatedResponse({ type: CreateInstagramPostsResponse })
    async createInstagramPosts(@Body() body: CreateInstagramPostsRequest, @UploadedFile() file: Express.Multer.File) {
        const imagePath = `/uploads/instagram-posts/${file.filename}`;
        return await this.commandBus.execute(new CreateInstagramPostsCommand(body.link, imagePath));
    }

    @Delete(':id')
    async deleteInstagramPosts(@Param('id', ParseIntPipe) id: number) {
        return await this.commandBus.execute(new DeleteInstagramPostsCommand(id));
    }

    @Get(':id')
    @ApiOkResponse({type: GetOneInstagramPostsAdminResponse})
    async getOneInstagramPosts(@Param('id',ParseIntPipe)id : number) {
        return this.queriesBus.execute(new GetOneInstagramPostsAdminQuery(id))
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const dest = './uploads/instagram-posts';
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest, { recursive: true });
                }
                cb(null, dest);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const uniqueName = `instagram-posts_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
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
    async updateInstagramPosts(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateInstagramPostsRequest, @UploadedFile() file?: Express.Multer.File){
        const imagePath = file ? `/uploads/instagram-posts/${file.filename}` : undefined;
        return await this.commandBus.execute(new UpdateInstagramPostsCommand(id, body.link, imagePath));
    }
}