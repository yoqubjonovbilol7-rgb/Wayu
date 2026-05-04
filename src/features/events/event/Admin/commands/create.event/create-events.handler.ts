import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateEventsCommand} from "@/features/events/event/Admin/commands/create.event/create-events.command";
import {CreateEventsResponse} from "@/features/events/event/Admin/commands/create.event/create-events.response";
import {EventCategories} from "@/features/events/eventCategory/eventCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {Events} from "@/features/events/event/event.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateEventsCommand)
export class CreateEventsHandler implements ICommandHandler<CreateEventsCommand>{
    async execute(cmd : CreateEventsCommand) : Promise<CreateEventsResponse>{
        const categoryExists = await EventCategories.existsBy({id: cmd.categoryId});
        if (!categoryExists) {
            throw new NotFoundException("Category with given id not found");
        }
        const newEvent = Events.create({
            categoryId : cmd.categoryId,
            title : cmd.title,
            content : cmd.content,
            image : cmd.image.path,
            date : cmd.date,
            address : cmd.address
        })

        await Events.save(newEvent)
        return plainToInstance(CreateEventsResponse,newEvent,{excludeExtraneousValues : true})
    }
}