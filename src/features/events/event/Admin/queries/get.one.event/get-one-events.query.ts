import {Query} from "@nestjs/cqrs";
import {GetOneEventsResponse} from "@/features/events/event/Admin/queries/get.one.event/get-one-events.response";

export class GetOneEventsQuery extends Query<GetOneEventsResponse>{
    constructor(public readonly id: number) {
        super();
    }
}