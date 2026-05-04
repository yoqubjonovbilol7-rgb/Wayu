import {Column, Entity, OneToMany} from "typeorm";
import { Events } from "@/features/events/event/event.entity";
import {BaseModel} from "@/core/base-model";


@Entity('EventCategories')
export class EventCategories extends BaseModel {
    @Column({ type: 'varchar', length: 64 })
    title: string;

    @OneToMany('Events', 'category')
    events: Events[];
}