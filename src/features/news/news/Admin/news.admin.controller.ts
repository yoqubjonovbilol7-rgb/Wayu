import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@/config/multer.config';
import { CreateNewsCommand } from '@/features/news/news/Admin/commands/create.news/create-news.command';
import { CreateNewsRequest } from '@/features/news/news/Admin/commands/create.news/create-news.Request';
import { UpdateNewsCommand } from '@/features/news/news/Admin/commands/update-news/update-news.command';
import { UpdateNewsRequest } from '@/features/news/news/Admin/commands/update-news/update-news.request';
import { DeleteNewsCommand } from '@/features/news/news/Admin/commands/delete-news/delete-news.command';
import { GetAllNewsFilters } from '@/features/news/news/Admin/queries/get-all-news/get-all-news.filters';
import { GetAllNewsQuery } from '@/features/news/news/Admin/queries/get-all-news/get-all-news.query';
import { GetOneNewsQuery } from '@/features/news/news/Admin/queries/get-one-news/get-one-news.query';
import {NewsItemResponse } from '@/features/news/news/Admin/queries/get-all-news/get-all-news.response';
import * as fs from 'fs';


@Controller('admin/news')
export class NewsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: NewsItemResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', multerOptions),
  )
  async createNews(@Body() payload: CreateNewsRequest, @UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }

    const cmd = new CreateNewsCommand(
      payload.categoryId,
      payload.title,
      payload.content,
      image,
      new Date(payload.date),
      payload.countryId,
    );

    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image?.path && fs.existsSync(image.path)) {
        fs.unlinkSync(image.path);
      }
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: NewsItemResponse })
  async getAllNews(@Query() filters: GetAllNewsFilters) {
    return this.queryBus.execute(new GetAllNewsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: NewsItemResponse })
  @ApiNotFoundResponse()
  async getOneNews(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneNewsQuery(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: NewsItemResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateNewsCommand(
      id,
      payload.categoryId,
      payload.title,
      payload.content,
      image,
      payload.date ? new Date(payload.date) : undefined,
      payload.countryId,
    );

    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image?.path && fs.existsSync(image.path)) {
        fs.unlinkSync(image.path);
      }
      throw exc;
    }
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteNewsCommand(id));
  }
}
