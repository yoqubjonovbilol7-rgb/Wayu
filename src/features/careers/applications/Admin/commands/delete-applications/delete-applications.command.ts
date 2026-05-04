import {Command} from "@nestjs/cqrs";

export class DeleteApplicationsCommand extends Command<void>{
  constructor(public id : number) {
    super();
  }
}