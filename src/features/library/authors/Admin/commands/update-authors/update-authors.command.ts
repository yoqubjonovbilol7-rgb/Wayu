import {Command} from "@nestjs/cqrs";
import {UpdateAuthorsResponse} from "@/features/library/authors/Admin/commands/update-authors/update-authors.response";

export class UpdateAuthorsCommand extends Command<UpdateAuthorsResponse>{
    constructor(public id : number,public fullName? : string) {
        super();
    }
}