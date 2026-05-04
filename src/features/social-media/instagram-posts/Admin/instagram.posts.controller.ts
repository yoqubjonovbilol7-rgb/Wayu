import {
    BadRequestException,
    Body,
    Controller, Get,
    Param, ParseIntPipe,
    Patch,
    Post, Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import fs from 'fs';
import { CreateInstagramPostCommand } from './commands/create-instagram-posts/create-instagram-post.command';
import { CreateInstagramPostResponse } from './commands/create-instagram-posts/create-instagram-post.response';
import { CreateInstagramPostRequest } from './commands/create-instagram-posts/create-instagram-post.request';
import {storageOptions} from "@/config/multer.config";
import {
    UpdateInstagramPostCommand
} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.command";
import {
    UpdateInstagramPostRequest
} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.request";
import {
    UpdateInstagramPostResponse
} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.response";
import {
    GetAllInstagramPostFilters
} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.filters";
import {
    GetAllInstagramPostQuery
} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.query";


@Controller('instagram-posts')
export class InstagramPostsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly  queryBus :QueryBus
    ) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({ type: CreateInstagramPostResponse })
    @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 },}))
    async create(@Body() payload: CreateInstagramPostRequest, @UploadedFile() image: Express.Multer.File,) {
        if (!image) {
            throw new BadRequestException('Image file is required');
        }
        const cmd = new CreateInstagramPostCommand(image, payload.link);
        try {
            return await this.commandBus.execute(cmd);
        } catch (err) {
            if (image?.path && fs.existsSync(image.path)) {
                fs.unlinkSync(image.path);
            }
            throw err;
        }
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiOkResponse({ type: UpdateInstagramPostResponse })
    @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 }}),
    )
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateInstagramPostRequest, @UploadedFile() image?: Express.Multer.File,) {
        if (!payload.link && !image) {
            throw new BadRequestException('Nothing to update');
        }

        const cmd = new UpdateInstagramPostCommand(id, image?.path, payload.link,);

        try {
            return await this.commandBus.execute(cmd);
        } catch (err) {
            if (image?.path && fs.existsSync(image.path)) {
                fs.unlinkSync(image.path);
            }
            throw err;
        }
    }

    @Get()
    async getAllInstagramPost(@Query() filters : GetAllInstagramPostFilters){
        return await this.queryBus.execute(new GetAllInstagramPostQuery(filters))
    }
}