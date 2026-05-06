import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
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
import {UpdateBranchRequest} from "@/features/organization/branches/Admin/command/update-branches/update-branches.request";
import {UpdateBranchesCommand} from "@/features/organization/branches/Admin/command/update-branches/update-branches.command";
import {GetOneBranchResponse} from "@/features/organization/branches/Admin/queries/get-one-branches/get-one-branches.response";
import {GetOneBranchesQuery} from "@/features/organization/branches/Admin/queries/get-one-branches/get-one-branches.query";

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

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBranchRequest) {
      const command = new UpdateBranchesCommand(
        id,
        payload.countryId,
        payload.representativeId,
        payload.city,
        payload.latitude,
        payload.longitude,
        payload.phoneNumber
      );

      return await this.commandBus.execute(command);

    }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneBranchesQuery(id));
  }
}