import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {CareerVacancyResponse} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.response";
import {GetAllVacanciesFilters} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.filters";
import {GetAllVacanciesQuery} from "@/features/careers/vacancies/Admin/queries/get-all-vacancies/get-all-vacancies.query";
import {CreateCareersVacanciesResponse} from "@/features/careers/vacancies/Admin/commands/create-vacancies/create-vacancies.response";
import {CreateVacanciesCommand} from "@/features/careers/vacancies/Admin/commands/create-vacancies/create-vacancies.command";
import {DeleteVacanciesCommand} from "@/features/careers/vacancies/Admin/commands/delete-vacancies/delete-vacancies.command";
import {GetOneCareersVacanciesResponse} from "@/features/careers/vacancies/Admin/queries/get-one-vacancies/get-one-vacancies.response";
import {GetOneVacanciesQuery} from "@/features/careers/vacancies/Admin/queries/get-one-vacancies/get-one-vacancies.query";
import {UpdateVacanciesRequest} from "@/features/careers/vacancies/Admin/commands/update-vacancies/update-vacancies.request";
import {CreateVacanciesRequest} from "@/features/careers/vacancies/Admin/commands/create-vacancies/create-vacancies.request";
import {UpdateVacanciesCommand} from "@/features/careers/vacancies/Admin/commands/update-vacancies/update-vacancies.command";
import {UpdateCareersVacanciesResponse} from "@/features/careers/vacancies/Admin/commands/update-vacancies/update-vacancies.response";

@Controller('admin/vacancies')
export class VacanciesAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {
    }

    @Get()
    @ApiOkResponse({type: [CareerVacancyResponse]})
    async getAllVacancies(@Query() filters: GetAllVacanciesFilters) {
        return await this.queriesBus.execute(new GetAllVacanciesQuery(filters));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateCareersVacanciesResponse })
    async createVacancy(@Body() cmd : CreateVacanciesRequest) {
        return await this.commandBus.execute(new CreateVacanciesCommand(
            cmd.title,
            cmd.address,
            cmd.description,
            cmd.phoneNumber,
            cmd.type,
            cmd.salary,
        ));
    }

    @Delete(':id')
    async deleteVacancy(@Param('id', ParseIntPipe) id: number) {
        return await this.commandBus.execute(new DeleteVacanciesCommand(id));
    }

    @Get(':id')
    @ApiOkResponse({type : GetOneCareersVacanciesResponse})
    async getOneVacancy(@Param('id',ParseIntPipe)id : number) {
        return this.queriesBus.execute(new GetOneVacanciesQuery(id))
    }


    @Patch(':id')
    @ApiOkResponse({type: UpdateCareersVacanciesResponse})
    async updateVacancy(@Param('id', ParseIntPipe) id: number, @Body() cmd: UpdateVacanciesRequest){
        return await this.commandBus.execute(new UpdateVacanciesCommand(
            id,
            cmd.title,
            cmd.address,
            cmd.description,
            cmd.phoneNumber,
            cmd.type,
            cmd.salary,
            cmd.isActive,
        ));
    }

}
