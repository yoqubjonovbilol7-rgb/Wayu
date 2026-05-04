import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateBranchesRequest} from "@/features/organization/branches/Admin/command/create-branches/create-branches.request";
import {CreateBranchesResponse} from "@/features/organization/branches/Admin/command/create-branches/create-branches.response";
import {CreateBranchesCommand} from "@/features/organization/branches/Admin/command/create-branches/create-branches.command";
import {DeleteBranchesCommand} from "@/features/organization/branches/Admin/command/delete-branches/delete-branches.command";
import {ApiOkResponse} from "@nestjs/swagger";
import {
    GetAllBranchesResponse
} from "@/features/organization/branches/Admin/queries/get-all-branches/get-all-branches.response";
import {
    GetAllBranchesFilters
} from "@/features/organization/branches/Admin/queries/get-all-branches/get-all-branches.filters";
import {
    GetAllBranchesQuery
} from "@/features/organization/branches/Admin/queries/get-all-branches/get-all-branches.query";

@Controller('admin/branches')
export class BranchesAdminController {
    constructor(
        private readonly commandBus : CommandBus,
        private readonly queryBus : QueryBus
    ) {}
    @Post()
    async createBranches(@Body() cmd: CreateBranchesRequest): Promise<CreateBranchesResponse> {
        return await this.commandBus.execute(
            new CreateBranchesCommand(
                cmd.countryId,
                cmd.representativeId,
                cmd.city,
                cmd.latitude,
                cmd.longitude,
                cmd.phoneNumber
            )
        );
    }



    @Delete(':id')
    async deleteBranches(@Param('id',ParseIntPipe) id : number){
        return await this.commandBus.execute(new  DeleteBranchesCommand(id))
    }

    @Get()
    @ApiOkResponse({type : [GetAllBranchesResponse]})
    async getAllBranches(@Query()filters: GetAllBranchesFilters){
        return await this.queryBus.execute(new GetAllBranchesQuery(filters))
    }
}