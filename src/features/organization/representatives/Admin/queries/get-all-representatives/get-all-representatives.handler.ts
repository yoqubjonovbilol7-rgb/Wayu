import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { Like } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Representatives } from '@/features/organization/representatives/representatives.entity';
import { GetAllRepresentativesQuery } from './get-all-representatives.query';
import { GetAllRepresentativesResponse } from './get-all-representatives.response';

@QueryHandler(GetAllRepresentativesQuery)
export class GetAllRepresentativesHandler
  implements IQueryHandler<GetAllRepresentativesQuery>
{
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllRepresentativesQuery): Promise<GetAllRepresentativesResponse> {
    const filters = query.filters;
    const skip = (filters.page - 1) * filters.limit;
    const take = filters.limit;

    const where: any = {};
    if (filters.search) {
      where.fullName = Like(`%${filters.search}%`);
    }

    let order: any = {};
    if (filters.sortBy) {
      const sortField = filters.sortBy === 'date' ? 'created' : filters.sortBy;
      order[sortField] = filters.sortOrder || 'DESC';
    } else {
      order.created = 'DESC';
    }

    const [data, total] = await this.manager.findAndCount(Representatives, {
      where,
      take,
      skip,
      order,
    });

    const totalPages = Math.ceil(total / filters.limit);

    return plainToInstance(
      GetAllRepresentativesResponse,
      {
        data,
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages,
      },
      { excludeExtraneousValues: true },
    );
  }
}
