import {Command} from "@nestjs/cqrs";

export class DeleteNewsCommand extends Command<void>{
  constructor(public id : number) {
    super();
  }
}