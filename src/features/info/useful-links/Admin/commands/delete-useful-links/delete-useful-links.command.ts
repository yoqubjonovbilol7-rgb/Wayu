import {Command} from "@nestjs/cqrs";

export class DeleteUsefulLinksCommand extends Command<void>{
  constructor(public id : number) {
    super();
  }
}