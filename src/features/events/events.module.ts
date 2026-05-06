import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventsController} from "@/features/events/event/Admin/events.admin.controller";
import {CreateEventsHandler} from "@/features/events/event/Admin/commands/create.event/create-events.handler";
import {DeleteEventsHandler} from "@/features/events/event/Admin/commands/delete.event/delete-events.handler";
import {UpdateEventsHandler} from "@/features/events/event/Admin/commands/update.event/update-events.handler";
import {GetAllEventsHandler} from "@/features/events/event/Admin/queries/get.all.event/get-all-events.handler";
import {EventsCategoryAdminController} from "@/features/events/eventCategory/Admin/eventCategory-admin.controller";
import {CreateEventsCategoryHandler} from "@/features/events/eventCategory/Admin/commands/create-events-category/create-events-category.handler";
import {DeleteEventsCategoryHandler} from "@/features/events/eventCategory/Admin/commands/delete-events-category/delete-events-category.handler";
import {UpdateEventsCategoryHandler} from "@/features/events/eventCategory/Admin/commands/update-events-category/update-events-category.handler";
import {GetAllEventsCategoriesHandler} from "@/features/events/eventCategory/Admin/queries/get-all-events-category/get-all-events-category.handler";
import {Events} from "@/features/events/event/event.entity";
import {EventCategories} from "@/features/events/eventCategory/eventCategories.entity";
import {GetOneEventCategoryHandler} from "@/features/events/eventCategory/Admin/queries/get-one-events-category/get-one-event-category.handler";

@Module({
    imports: [TypeOrmModule.forFeature([Events, EventCategories])],
    controllers : [
        EventsController,
        EventsCategoryAdminController ],
    providers : [
        CreateEventsHandler,
        DeleteEventsHandler,
        UpdateEventsHandler,
        GetAllEventsHandler,

        CreateEventsCategoryHandler,
        DeleteEventsCategoryHandler,
        UpdateEventsCategoryHandler,
        GetAllEventsCategoriesHandler,
        GetOneEventCategoryHandler
    ]
})

export class EventsModule {}