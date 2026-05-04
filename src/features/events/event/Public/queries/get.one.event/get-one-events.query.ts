import {Query} from "@nestjs/cqrs";
import {GetAllEventsResponse} from "@/features/events/event/Public/queries/get.one.event/get-all-events.response";

export class GetOneEventsQuery extends Query<GetAllEventsResponse>{
    constructor(public readonly id: number) {
        super();
    }
}