import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import { Events } from '@/features/events/event/event.entity';
import { GetAllEventsQuery } from './get-all-events.query';
import { GetAllEventsResponse } from './get-all-events.response';

@QueryHandler(GetAllEventsQuery)
export class GetAllEventsPublicHandler
  implements IQueryHandler<GetAllEventsQuery>
{
  async execute(query: GetAllEventsQuery) {
    const take = query.filters?.size ?? 10;
    const page = query.filters?.page ?? 1;
    const skip = (page - 1) * take;

    const events = await Events.find({ skip : skip, take :take, });

    return plainToInstance(GetAllEventsResponse, events, { excludeExtraneousValues: true, });
  }
}