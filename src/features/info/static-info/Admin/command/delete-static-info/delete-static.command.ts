import {Command} from "@nestjs/cqrs";

export class DeleteStaticCommand extends Command<void>{
  constructor(public id : number) {
    super();
  }
}