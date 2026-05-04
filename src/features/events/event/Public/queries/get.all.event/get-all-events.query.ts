import { Query } from "@nestjs/cqrs";
import {GetAllEventsResponse} from "@/features/events/event/Public/queries/get.all.event/get-all-events.response";
import {GetAllEventsFilters} from "@/features/events/event/Public/queries/get.all.event/get-all-events.filters";


export class GetAllEventsQuery extends Query<GetAllEventsResponse[]> {
    constructor(public readonly filters: GetAllEventsFilters) {
        super();
    }
}