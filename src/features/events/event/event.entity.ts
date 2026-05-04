import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {EventCategories} from "../eventCategory/eventCategories.entity";
import {BaseModel} from "@/core/base-model";

@Entity('event')
export class Events extends BaseModel {

    @Column()
    categoryId: number;

    @Column({ type: 'varchar', length: 256 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'varchar', length: 128 })
    image: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'varchar', length: 128 })
    address: string;

    @ManyToOne(() => EventCategories, (category) => category.events)
    @JoinColumn({ name: 'categoryId' })
    category: EventCategories;
}