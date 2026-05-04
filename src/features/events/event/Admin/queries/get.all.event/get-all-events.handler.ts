import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllEventsQuery} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.query";
import {GetAllEventsResponse} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.response";
import {Events} from "@/features/events/event/event.entity";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetAllEventsQuery)
export class GetAllEventsHandler implements IQueryHandler<GetAllEventsQuery> {
    async execute(query : GetAllEventsQuery) : Promise<GetAllEventsResponse[]>{
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const events = await Events.find({skip : skip,take : take})
        return plainToInstance(GetAllEventsResponse,events,{excludeExtraneousValues : true})
    }

}