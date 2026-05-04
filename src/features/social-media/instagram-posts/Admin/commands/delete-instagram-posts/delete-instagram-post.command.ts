import {Command} from "@nestjs/cqrs";

export class DeleteInstagramPostCommand extends Command<void> {
  constructor(public id : number) {
    super();
  }
}