import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import {UpdateTagsCommand} from "@/features/news/tags/Admin/command/update-tags/update-tags.command";
import {UpdateTagsResponse} from "@/features/news/tags/Admin/command/update-tags/update-tags.response";
import {Tags} from "@/features/news/tags/tags.entity";

@CommandHandler(UpdateTagsCommand)
export class UpdateTagsHandler implements ICommandHandler<UpdateTagsCommand> {

    async execute(command: UpdateTagsCommand): Promise<UpdateTagsResponse> {
        const tags = await Tags.findOne({where: {id : command.id}});
        if (!tags) {
            throw new NotFoundException('id topilmadi');
        }
        if (command.title) {
            tags.title = command.title;
        }

        const updatedTags = await tags.save();
        return plainToInstance(UpdateTagsResponse, updatedTags, {excludeExtraneousValues: true});
    }
}