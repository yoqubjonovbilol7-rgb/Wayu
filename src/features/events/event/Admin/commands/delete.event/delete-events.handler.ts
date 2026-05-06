import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { DeleteEventCommand } from "@/features/events/event/Admin/commands/delete.event/delete-events.command";
import { Events } from "@/features/events/event/event.entity";


@CommandHandler(DeleteEventCommand)
export class DeleteEventsHandler implements ICommandHandler<DeleteEventCommand> {

    async execute(cmd: DeleteEventCommand): Promise<void> {
        const event = await Events.findOneBy({ id: cmd.id });

        if (!event) {
            throw new NotFoundException("Event with given id not found");
        }

        await Events.remove(event);
    }
}