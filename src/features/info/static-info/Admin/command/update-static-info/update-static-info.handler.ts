import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdateStaticInfoCommand } from './update-static-info.command';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';
import { UpdateStaticInfoResponse } from './update-static-info.response';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
  async execute(cmd: UpdateStaticInfoCommand,): Promise<UpdateStaticInfoResponse> {
 ;
    const staticInfo = await StaticInfo.findOneBy({ id : cmd.id });

    if (!staticInfo) {
      throw new NotFoundException('StaticInfo not found');
    }

    if (cmd.appStoreLink) {
      staticInfo.appStoreLink = cmd.appStoreLink;
    }

    if (cmd.playMarketLink) {
      staticInfo.playMarketLink = cmd.playMarketLink;
    }

    if (cmd.aboutUs) {
      staticInfo.aboutUs = cmd.aboutUs;
    }

    const updated = await staticInfo.save();

    return plainToInstance(UpdateStaticInfoResponse, updated, {excludeExtraneousValues: true,});
  }
}