import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Delete,
  Patch,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOkResponse } from "@nestjs/swagger";
import fs from "fs";


import { CreateBooksRequest } from "@/features/library/book/Admin/commands/create-books/create-books.request";
import { CreateBooksCommand } from "@/features/library/book/Admin/commands/create-books/create-books.command";
import { UpdateBooksRequest } from "@/features/library/book/Admin/commands/update-books/update-books.request";
import { UpdateBooksCommand } from "@/features/library/book/Admin/commands/update-books/update-books.command";
import { DeleteBooksCommand } from "@/features/library/book/Admin/commands/delete-books/delete-books.command";

import { storageOptions } from "@/config/multer.config";

import { GetOneBooksAdminQuery } from "@/features/library/book/Admin/queries/get-one-books/get-one-books-admin.query";
import { GetAllBooksFilters } from "@/features/library/book/Admin/queries/get-all-books/get-all-books.filters";
import { GetAllBooksResponse } from "@/features/library/book/Admin/queries/get-all-books/get-all-books.response";
import { GetAllBooksQuery } from "@/features/library/book/Admin/queries/get-all-books/get-all-books.query";

@Controller("admin/books")
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: "image" }, { name: "file" }],
      { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 } }
    )
  )
  async create(
    @Body() payload: CreateBooksRequest,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    const image = files?.image?.[0];
    const file = files?.file?.[0];

    if (!image || !file) {
      throw new BadRequestException("Image and file are required");
    }

    const cmd = new CreateBooksCommand(
      payload.authorId,
      payload.categoryId,
      payload.title,
      payload.pages,
      payload.year,
      image.path,
      file.path,
      payload.description,
    );

    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image?.path && fs.existsSync(image.path)) fs.unlinkSync(image.path);
      if (file?.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
      throw exc;
    }
  }


  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneBooksAdminQuery(id));
  }


  @Get()
  @ApiOkResponse({ type: [GetAllBooksResponse] })
  async getAll(@Query() filters: GetAllBooksFilters) {
    return this.queryBus.execute(new GetAllBooksQuery(filters));
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteBooksCommand(id));
  }

  @Patch(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: "image" }, { name: "file" }],
      { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 } }
    )
  )
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() payload: UpdateBooksRequest,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    const cmd = new UpdateBooksCommand(
      id,
      payload.authorId,
      payload.categoryId,
      payload.title,
      payload.description,
      payload.pages,
      payload.year,
      files?.image?.[0]?.path,
      files?.file?.[0]?.path,
    );

    return this.commandBus.execute(cmd);
  }
}