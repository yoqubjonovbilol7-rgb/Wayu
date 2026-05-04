import {Command} from "@nestjs/cqrs";
import {UpdateSocialLinksResponse} from "@/features/info/social-links/Admin/commands/update-social-links/update-social-links.response";

export class UpdateUsefulLinksCommand extends Command<UpdateSocialLinksResponse>{
  constructor(
    public readonly id: number,
    public readonly title?: string,
    public readonly icon?: string,
    public readonly link?: string,
  ) {
    super();
  }
}