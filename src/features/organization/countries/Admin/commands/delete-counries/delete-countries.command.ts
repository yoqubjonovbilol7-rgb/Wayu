import {Command} from "@nestjs/cqrs";

export class DeleteCountriesCommand extends Command<void>{
    constructor(public readonly id : number){
        super();
    }
}