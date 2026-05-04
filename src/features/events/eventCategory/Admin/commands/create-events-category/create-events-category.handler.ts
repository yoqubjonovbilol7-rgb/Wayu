import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateEventsCategoryCommand} from "@/features/events/eventCategory/Admin/commands/create-events-category/create-events-category.command";
import {EventCategories} from "@/features/events/eventCategory/eventCategories.entity";
import {CreateEventsCategoryResponse} from "@/features/events/eventCategory/Admin/commands/create-events-category/create-events-category.response";

@CommandHandler(CreateEventsCategoryCommand)
export class CreateEventsCategoryHandler implements ICommandHandler<CreateEventsCategoryCommand> {

    async execute(command: CreateEventsCategoryCommand): Promise<CreateEventsCategoryResponse> {
        const alreadyExists = await EventCategories.existsBy({title: ILike(command.title)});
        if (alreadyExists)
            throw new BadRequestException("Title is already taken");

        const newEventsCategory = EventCategories.create({title: command.title} as EventCategories);
        await EventCategories.save(newEventsCategory);

        return plainToInstance(CreateEventsCategoryResponse, newEventsCategory, {excludeExtraneousValues: true});
    }
}