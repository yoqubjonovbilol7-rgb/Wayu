import {Command} from "@nestjs/cqrs";

export class DeleteAuthorsCommand extends Command<void> {
    id : number
}