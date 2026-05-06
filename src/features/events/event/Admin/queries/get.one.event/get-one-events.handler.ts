import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneEventsQuery } from '@/features/events/event/Admin/queries/get.one.event/get-one-events.query';
import { Events } from '@/features/events/event/event.entity';
import { GetOneEventsResponse } from '@/features/events/event/Admin/queries/get.one.event/get-one-events.response';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';


@QueryHandler(GetOneEventsQuery)
export class GetOneEventHandler implements IQueryHandler<GetOneEventsQuery> {
  async execute(query: GetOneEventsQuery) : Promise<GetOneEventsResponse> {
    const event = await Events.findOne({
      where: { id: query.id },
    });

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return plainToInstance(GetOneEventsResponse, event, {
      excludeExtraneousValues: true,
    });
  }
}