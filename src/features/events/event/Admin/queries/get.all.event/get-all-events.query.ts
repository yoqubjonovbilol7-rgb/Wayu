import { Query } from "@nestjs/cqrs";
import {GetAllEventsFilters} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.filters";
import {GetAllEventsResponse} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.response";

export class GetAllEventsQuery extends Query<GetAllEventsResponse[]> {
    constructor(public readonly filters: GetAllEventsFilters) {
        super();
    }
}