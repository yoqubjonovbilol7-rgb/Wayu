import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { Events } from '@/features/events/event/event.entity';
import { GetAllEventsQuery } from './get-all-events.query';
import { GetAllEventsResponse } from './get-all-events.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllEventsQuery)
export class GetAllEventsPublicHandler implements IQueryHandler<GetAllEventsQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetAllEventsQuery): Promise<GetAllEventsResponse[]> {
    const page = query.filters?.page ?? 1;
    const size = query.filters?.size ?? 10;
    const qb: SelectQueryBuilder<Events> = this.manager.createQueryBuilder(Events, 'event');

    if (query.filters?.categoryId) {
      qb.andWhere('event.categoryId = :categoryId', { categoryId: query.filters.categoryId });
    }

    if (query.filters?.search) {
      qb.andWhere('(event.title ILIKE :search OR event.content ILIKE :search)', {
        search: `%${query.filters.search}%`,
      });
    }

    const events = await qb
      .orderBy('event.created', 'DESC')
      .take(size)
      .skip((page - 1) * size)
      .getMany();

    return plainToInstance(GetAllEventsResponse, events, {
      excludeExtraneousValues: true,
    });
  }
}
