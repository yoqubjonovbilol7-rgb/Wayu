import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {GetOneBranchesQuery} from "@/features/organization/branches/Admin/queries/get-one-branches/get-one-branches.query";
import {GetOneBranchResponse} from "@/features/organization/branches/Admin/queries/get-one-branches/get-one-branches.response";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {Branch} from "@/features/organization/branches/branch.entity";


@QueryHandler(GetOneBranchesQuery)
export class GetOneBranchHandler implements IQueryHandler<GetOneBranchesQuery> {

  async execute(query: GetOneBranchesQuery): Promise<GetOneBranchResponse> {
    const branch = await Branch.findOne({
      where: { id: query.id } as any,
      relations: ['country', 'representative']
    });

    if (!branch) {
      throw new NotFoundException(`ID bo'lgan filial topilmadi`);
    }


    return plainToInstance(GetOneBranchResponse, branch, {excludeExtraneousValues: true});
  }
}