import {Command} from "@nestjs/cqrs";

export class DeleteTagsCommand extends Command<void>{
    constructor(public id : number) {
        super();
    }
}