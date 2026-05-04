import {Command} from "@nestjs/cqrs";
import {CreateStaticInfoResponse} from "@/features/info/static-info/Admin/command/create-static-info/create-static-info.response";

export class CreateStaticInfoCommand extends Command<CreateStaticInfoResponse>{
  constructor(
    public readonly appStoreLink?: string,
    public readonly playMarketLink?: string,
    public readonly aboutUs?: string,) {
    super();
  }
}