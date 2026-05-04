import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { Branch } from '@/features/organization/branches/branch.entity';
import { GetAllBranchesPublicQuery } from './get-all-branches.query';
import { GetAllBranchesPublicResponse } from './get-all-branches.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllBranchesPublicQuery)
export class GetAllBranchesPublicHandler implements IQueryHandler<GetAllBranchesPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllBranchesPublicQuery): Promise<GetAllBranchesPublicResponse[]> {
    const page = query.filters?.page ?? 1;
    const limit = query.filters?.limit ?? 10;
    const branches = await this.manager.find(Branch, {
      take: limit,
      skip: (page - 1) * limit,
      order: { created: 'DESC' },
    });

    return plainToInstance(GetAllBranchesPublicResponse, branches, {
      excludeExtraneousValues: true,
    });
  }
}
