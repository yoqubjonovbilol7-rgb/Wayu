import {Command} from "@nestjs/cqrs";

export class DeleteSocialLinksCommand extends Command<void>{
  constructor(public id : number) {
    super();
  }
}