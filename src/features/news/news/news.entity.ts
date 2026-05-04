import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {NewsCategories} from "../news-category/newsCategories.entity";
import {Countries} from "../../organization/countries/countries.entity";
import {BaseModel} from "@/core/base-model";
import {NewsTag} from "@/features/news/newsTag/NewsTag.entity";

@Entity('news')
export class News extends BaseModel {

    @Column()
    categoryId!: number;

    @Column({ nullable: true })
    countryId?: number;

    @Column({ length: 256 })
    title: string;

    @Column({ length: 128 })
    image: string;

    @Column({ type: 'date' })
    date: Date;

    @Column('text')
    content: string;

    @ManyToOne(() => NewsCategories, (category) => category.news, {onDelete: "RESTRICT"})
    category: NewsCategories;

    @ManyToOne(() => Countries, (country) => country.news)
    country?: Countries;

    @OneToMany('NewsTag', 'news')
    newsTags: NewsTag[];
}