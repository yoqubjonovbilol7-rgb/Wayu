import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { DeleteEventCommand } from "@/features/events/event/Admin/commands/delete.event/delete-events.command";
import { Events } from "@/features/events/event/event.entity";
import * as fs from 'fs';
import * as path from 'path';

@CommandHandler(DeleteEventCommand)
export class DeleteEventsHandler implements ICommandHandler<DeleteEventCommand> {

    async execute(cmd: DeleteEventCommand): Promise<void> {
        const event = await Events.findOneBy({ id: cmd.id });

        if (!event) {
            throw new NotFoundException("Event with given id not found");
        }

        if (event.image) {
            const filePath = path.join(process.cwd(), 'uploads', event.image);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.error(`Faylni o'chirishda xatolik (${event.image}):`, err);
                }
            }
        }
        await Events.remove(event);
    }
}