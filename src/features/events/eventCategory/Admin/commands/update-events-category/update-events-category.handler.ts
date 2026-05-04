import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { plainToInstance } from "class-transformer";
import { UpdateEventsCategoryCommand } from "./update-events-category.command";
import { UpdateEventsCategoryResponse } from "./update-events-category.response";
import { EventCategories } from "@/features/events/eventCategory/eventCategories.entity";

@CommandHandler(UpdateEventsCategoryCommand)
export class UpdateEventsCategoryHandler implements ICommandHandler<UpdateEventsCategoryCommand> {
  constructor(private readonly manager: EntityManager) {}

  async execute(command: UpdateEventsCategoryCommand): Promise<UpdateEventsCategoryResponse> {
    const category = await this.manager.findOne(EventCategories, { where: { id: command.id } });
    if (!category) {
      throw new NotFoundException('id topilmadi');
    }
    if (command.title) {
      category.title = command.title;
    }

    const updatedCategory = await this.manager.save(category);
    return plainToInstance(UpdateEventsCategoryResponse, updatedCategory, { excludeExtraneousValues: true });
  }
}