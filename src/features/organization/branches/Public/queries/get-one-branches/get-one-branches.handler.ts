import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Branch } from '@/features/organization/branches/branch.entity';
import { GetOneBranchPublicQuery } from './get-one-branches.query';
import { GetOneBranchPublicResponse } from './get-one-branches.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneBranchPublicQuery)
export class GetOneBranchPublicHandler implements IQueryHandler<GetOneBranchPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneBranchPublicQuery): Promise<GetOneBranchPublicResponse> {
    const branch = await this.manager.findOne(Branch, {
      where: { id: query.id },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return plainToInstance(GetOneBranchPublicResponse, branch, {
      excludeExtraneousValues: true,
    });
  }
}
