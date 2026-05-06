import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOkResponse } from "@nestjs/swagger";
import * as fs from "fs";

import { CreateApplicationsCommand } from "./commands/create-applications/create-applications.command";
import { multerOptions } from "@/config/multer.config";
import { CreateApplicationsRequest } from "@/features/careers/applications/Admin/commands/create-applications/create-applications.request";
import { DeleteApplicationsCommand } from "@/features/careers/applications/Admin/commands/delete-applications/delete-applications.command";
import { UpdateApplicationsRequest } from "@/features/careers/applications/Admin/commands/update-applications/update-applications.request";
import { UpdateApplicationsCommand } from "@/features/careers/applications/Admin/commands/update-applications/update-applications.command";
import { GetAllApplicationsFilters } from "./queries/get-all-applications/get-all-applications.filters";
import { GetAllApplicationsQuery } from "./queries/get-all-applications/get-all-applications.query";
import { GetAllApplicationsResponse } from "./queries/get-all-applications/get-all-applications.response";
import { GetOneApplicationsQuery } from "./queries/get-one-applications/get-one-applications.query";
import { GetOneApplicationsResponse } from "./queries/get-one-applications/get-one-applications.response";
import {Role} from "@/core/enums/role.enum";
import {Roles} from "@/core/decorators/roles.decorator";


@Controller("admin/applications")
@Roles(Role.Admin,Role.SuperAdmin)
export class ApplicationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllApplicationsResponse })
  async getAll(@Query() filters: GetAllApplicationsFilters) {
    return this.queryBus.execute(new GetAllApplicationsQuery(filters));
  }

  @Get(":id")
  @ApiOkResponse({ type: GetOneApplicationsResponse })
  async getOne(@Param("id", ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneApplicationsQuery(id));
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("resume", multerOptions))
  async createApplication(@Body() payload: CreateApplicationsRequest, @UploadedFile() resume: Express.Multer.File,) {
    if (!resume) {
      throw new BadRequestException("Resume file is required");
    }

    const cmd = new CreateApplicationsCommand(
      payload.fullName,
      payload.phoneNumber,
      payload.email,
      payload.vacancyId,
      resume,
    );

    try {
      return await this.commandBus.execute(cmd);
    } catch (error) {
      if (resume?.path && fs.existsSync(resume.path)) {
        fs.unlinkSync(resume.path);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteApplication(@Param("id") id: number) {
    return this.commandBus.execute(new DeleteApplicationsCommand(id),);
  }


  @Patch(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("resume", multerOptions))
  async updateApplication(@Param("id") id: number, @Body() payload: UpdateApplicationsRequest, @UploadedFile() resume?: Express.Multer.File,) {
    if (!id) {
      throw new BadRequestException("ID is required");
    }

    try {
      return await this.commandBus.execute(
        new UpdateApplicationsCommand(
          id,
          payload.fullName,
          payload.phoneNumber,
          payload.email,
          payload.vacancyId,
          resume,
        ),
      );
    } catch (error) {
      if (resume?.path && fs.existsSync(resume.path)) {
        fs.unlinkSync(resume.path);
      }
      throw error;
    }
  }
}