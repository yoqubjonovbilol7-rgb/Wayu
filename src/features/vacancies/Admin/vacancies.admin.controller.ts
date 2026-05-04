import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllVacanciesResponse } from './queries/get-all-vacancies/get-all-vacancies.response';
import { GetAllVacanciesFilters } from './queries/get-all-vacancies/get-all-vacancies.filters';
import { GetAllVacanciesQuery } from './queries/get-all-vacancies/get-all-vacancies.query';
import { CreateVacanciesResponse } from './commands/create-vacancies/create-vacancies.response';
import { CreateVacanciesCommand } from './commands/create-vacancies/create-vacancies.command';
import { DeleteVacanciesCommand } from './commands/delete-vacancies/delete-vacancies.command';
import { GetOneVacanciesResponse } from './queries/get-one-vacancies/get-one-vacancies.response';
import { GetOneVacanciesQuery } from './queries/get-one-vacancies/get-one-vacancies.query';
import { UpdateVacanciesRequest } from './commands/update-vacancies/update-vacancies.request';
import { CreateVacanciesRequest } from './commands/create-vacancies/create-vacancies.request';
import { UpdateVacanciesCommand } from './commands/update-vacancies/update-vacancies.command';
import { UpdateVacanciesResponse } from './commands/update-vacancies/update-vacancies.response';

@Controller('admin/vacancies')
export class VacanciesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queriesBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllVacanciesResponse })
  async getAllVacancies(@Query() filters: GetAllVacanciesFilters) {
    return await this.queriesBus.execute(new GetAllVacanciesQuery(filters));
  }

  @Post()
  @ApiCreatedResponse({ type: CreateVacanciesResponse })
  async createVacancy(@Body() cmd: CreateVacanciesRequest) {
    return await this.commandBus.execute(
      new CreateVacanciesCommand(
        cmd.title,
        cmd.address,
        cmd.description,
        cmd.phoneNumber,
        cmd.type,
        cmd.salary,
      ),
    );
  }

  @Delete(':id')
  async deleteVacancy(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteVacanciesCommand(id));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacanciesResponse })
  async getOneVacancy(@Param('id', ParseIntPipe) id: number) {
    return this.queriesBus.execute(new GetOneVacanciesQuery(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateVacanciesResponse })
  async updateVacancy(@Param('id', ParseIntPipe) id: number, @Body() cmd: UpdateVacanciesRequest) {
    return await this.commandBus.execute(
      new UpdateVacanciesCommand(
        id,
        cmd.title,
        cmd.address,
        cmd.description,
        cmd.phoneNumber,
        cmd.type,
        cmd.salary,
        cmd.isActive,
      ),
    );
  }
}

