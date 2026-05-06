import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateInstagramPostsResponse} from "./commands/create-instagram-posts/create-instagram-posts.response";
import {CreateInstagramPostsCommand} from "./commands/create-instagram-posts/create-instagram-posts.command";
import {DeleteInstagramPostsCommand} from "./commands/delete-instagram-posts/delete-instagram-posts.command";
import {CreateInstagramPostsRequest} from "./commands/create-instagram-posts/create-instagram-posts.request";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as fs from "fs";
import * as path from "path";
import {GetAllInstagramPostFilters} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.filters";
import {GetOneInstagramPostQuery} from "@/features/social-media/instagram-posts/Admin/queries/get-one-instagram-post/get-one-instagram-post.query";
import {GetOneInstagramPostResponse} from "@/features/social-media/instagram-posts/Admin/queries/get-one-instagram-post/get-one-instagram-post.response";
import {GetAllInstagramPostQuery} from "@/features/social-media/instagram-posts/Admin/queries/get-all-instagram-post/get-all-instagram-post.query";
import {UpdateInstagramPostCommand} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.command";
import {UpdateInstagramPostRequest} from "@/features/social-media/instagram-posts/Admin/commands/update-instagram-posts/update-instagram-post.request";
import {storageOptions} from "@/config/multer.config";

@Controller('admin/instagram-posts')
export class InstagramPostsAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }
  @Get()
  @ApiOkResponse({ type: GetOneInstagramPostResponse, isArray: true })
  async getAllInstagramPosts(@Query() filters: GetAllInstagramPostFilters) {
    return await this.queryBus.execute(new GetAllInstagramPostQuery(filters));
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
    @ApiOkResponse({type:  GetOneInstagramPostResponse })
    async getOneInstagramPosts(@Param('id',ParseIntPipe)id : number) {
        return this.queryBus.execute(new GetOneInstagramPostQuery(id))
    }


  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 } }))
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstagramPostRequest,
    @UploadedFile() image?: Express.Multer.File
  ) {

    const cmd = new UpdateInstagramPostCommand(id, payload.link, image?.path);

    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {

      if (image && image.path && fs.existsSync(image.path)) {
        fs.rmSync(image.path);
      }
      throw exc;
    }
  }

}