import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStaticInfoCommand } from './create-static-info.command';
import { CreateStaticInfoResponse } from './create-static-info.response';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateStaticInfoCommand)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoCommand> {
  async execute(command: CreateStaticInfoCommand,): Promise<CreateStaticInfoResponse> {
    const { appStoreLink, playMarketLink, aboutUs } = command;
    const staticInfo = StaticInfo.create({
      appStoreLink,
      playMarketLink,
      aboutUs,
    });
    const saved = await StaticInfo.save(staticInfo);
    return plainToInstance(CreateStaticInfoResponse, saved, {excludeExtraneousValues: true,});
  }
}