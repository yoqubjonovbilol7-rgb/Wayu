import {Command} from "@nestjs/cqrs";
import {CreateSocialLinksResponse} from "@/features/info/social-links/Admin/commands/create-social-links/create-social-links.response";

export class CreateSocialLinksCommand extends Command<CreateSocialLinksResponse>{
  constructor(
    public readonly title: string,
    public readonly icon: string,
    public readonly link: string,
  ) {
    super();
  }
}