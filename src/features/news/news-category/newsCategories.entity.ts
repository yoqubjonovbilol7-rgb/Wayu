import {Column, Entity, OneToMany} from "typeorm";
import { News } from "../news/news.entity";
import {BaseModel} from "@/core/base-model";


@Entity('NewsCategories')
export class NewsCategories extends BaseModel {
    @Column({length: 64 ,unique : true})
    title: string;

    @Column({nullable: true})
    image?: string;

    @OneToMany('News', 'category')
    news: News[];
}