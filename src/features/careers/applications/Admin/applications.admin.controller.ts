import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException, Delete, Param, Patch,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import * as fs from "fs";

import { CreateApplicationsCommand } from "./commands/create-applications/create-applications.command";
import {storageOptions, multerOptions} from "@/config/multer.config";
import {CreateApplicationsRequest} from "@/features/careers/applications/Admin/commands/create-applications/create-applications.request";
import {DeleteApplicationsCommand} from "@/features/careers/applications/Admin/commands/delete-applications/delete-applications.command";
import {UpdateApplicationsRequest} from "@/features/careers/applications/Admin/commands/update-applications/update-applications.request";
import {UpdateApplicationsCommand} from "@/features/careers/applications/Admin/commands/update-applications/update-applications.command";


@Controller("admin/applications")
export class ApplicationsController {
  constructor(private readonly commandBus: CommandBus) {}

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