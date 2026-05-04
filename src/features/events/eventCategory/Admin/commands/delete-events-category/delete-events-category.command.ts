import {Command} from "@nestjs/cqrs";

export class DeleteEventsCategoryCommand extends Command<void>{
    id : number
}