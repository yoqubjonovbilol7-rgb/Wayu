import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateTagsCommand} from "@/features/news/tags/Admin/command/create-tags/create-tags.command";
import {CreateTagsResponse} from "@/features/news/tags/Admin/command/create-tags/create-tags.response";
import {Tags} from "@/features/news/tags/tags.entity";

@CommandHandler(CreateTagsCommand)
export class CreateTagsHandler implements ICommandHandler<CreateTagsCommand> {

    async execute(command: CreateTagsCommand): Promise<CreateTagsResponse> {
        const alreadyExists = await Tags.existsBy({title: ILike(command.title)});
        if (alreadyExists)
            throw new BadRequestException("Title is already taken");

        const newTags = Tags.create({title: command.title} as Tags);
        await Tags.save(newTags);

        return plainToInstance(CreateTagsResponse, newTags, {excludeExtraneousValues: true});
    }
}