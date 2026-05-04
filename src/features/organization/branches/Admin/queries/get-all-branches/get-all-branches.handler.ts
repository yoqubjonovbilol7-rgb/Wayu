import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import { GetAllBranchesQuery } from './get-all-branches.query';
import { GetAllBranchesResponse } from './get-all-branches.response';
import { Branch } from '@/features/organization/branches/branch.entity';

@QueryHandler(GetAllBranchesQuery)
export class GetAllBranchesHandler
    implements IQueryHandler<GetAllBranchesQuery>
{
    async execute(query: GetAllBranchesQuery,): Promise<GetAllBranchesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const branches = await Branch.find({skip: skip, take : take,});

        return plainToInstance(GetAllBranchesResponse, branches, {excludeExtraneousValues: true,});
    }
}