import {Command} from "@nestjs/cqrs";

export class DeleteBranchesCommand extends Command<void>{
    constructor(public readonly id : number) {
        super();
    }
}