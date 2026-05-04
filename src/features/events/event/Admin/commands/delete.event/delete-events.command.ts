import { Command } from "@nestjs/cqrs";


export class DeleteEventCommand extends Command<void> {
    constructor(public id : number) {
        super();
    }
}