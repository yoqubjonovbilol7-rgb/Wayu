import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Events } from '@/features/events/event/event.entity';
import { GetOneEventsQuery } from './get-one-events.query';
import { GetAllEventsResponse } from './get-all-events.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneEventsQuery)
export class GetOneEventsPublicHandler implements IQueryHandler<GetOneEventsQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneEventsQuery): Promise<GetAllEventsResponse> {
    const event = await this.manager.findOne(Events, {
      where: { id: query.id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return plainToInstance(GetAllEventsResponse, event, {
      excludeExtraneousValues: true,
    });
  }
}
