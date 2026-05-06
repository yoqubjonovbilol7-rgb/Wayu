import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneEventCategoryQuery } from './get-one-event-category.query';

import { NotFoundException } from '@nestjs/common';
import {EventCategories} from "@/features/events/eventCategory/eventCategories.entity";

@QueryHandler(GetOneEventCategoryQuery)
export class GetOneEventCategoryHandler implements IQueryHandler<GetOneEventCategoryQuery> {

  async execute(query: GetOneEventCategoryQuery) {
    const category = await EventCategories.findOne({ where: { id: query.id } });

    if (!category) {
      throw new NotFoundException(`Event category with ID ${query.id} not found`);
    }

    return category;
  }
}