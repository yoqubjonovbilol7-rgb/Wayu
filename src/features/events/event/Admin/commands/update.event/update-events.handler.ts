import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Events } from "@/features/events/event/event.entity";
import { NotFoundException } from "@nestjs/common";
import { UpdateEventCommand } from "@/features/events/event/Admin/commands/update.event/update-events.command";
import { UpdateEventsResponse } from "./update-events.response";
import { plainToInstance } from "class-transformer";
import * as fs from 'fs';
import * as path from 'path';

@CommandHandler(UpdateEventCommand)
export class UpdateEventsHandler implements ICommandHandler<UpdateEventCommand> {

    async execute(cmd: UpdateEventCommand): Promise<UpdateEventsResponse> {
        const event = await Events.findOneBy({ id: cmd.id });

        if (!event) {
            throw new NotFoundException(`ID ${cmd.id}  topilmadi`);
        }

        if (cmd.image && event.image) {
            const oldFilePath = path.join(process.cwd(), 'uploads', event.image);
            if (fs.existsSync(oldFilePath)) {
                try { fs.unlinkSync(oldFilePath); } catch (err) {}
            }
        }
        Object.assign(event, cmd);
        if (cmd.image) {
            event.image = cmd.image.filename;
        }

        const savedEvent = await event.save();

        return plainToInstance(UpdateEventsResponse, savedEvent, {
            excludeExtraneousValues: true,
        });
    }
}