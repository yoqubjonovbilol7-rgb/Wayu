import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteEventsCategoryCommand} from "@/features/events/eventCategory/Admin/commands/delete-events-category/delete-events-category.command";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {EventCategories} from "@/features/events/eventCategory/eventCategories.entity";
import {Events} from "@/features/events/event/event.entity";

@CommandHandler(DeleteEventsCategoryCommand)
export class DeleteEventsCategoryHandler implements ICommandHandler<DeleteEventsCategoryCommand>{
    async execute(cmd: DeleteEventsCategoryCommand): Promise<void> {
        const category = await EventCategories.findOneBy({id: cmd.id});
        if (!category)
            throw new NotFoundException("Category with given id not found");

        const hasAnyAttachedEvents = await Events.existsBy({categoryId: cmd.id});
        if (hasAnyAttachedEvents)
            throw new BadRequestException("Category has attached Event, move or delete them first");

        await EventCategories.remove(category);
    }
}