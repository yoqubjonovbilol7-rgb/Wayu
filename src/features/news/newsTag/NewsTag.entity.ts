import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {News} from "../news/news.entity";
import {Tags} from "../tags/tags.entity";
import {BaseModel} from "@/core/base-model";


@Entity('newsTag')
export class NewsTag extends BaseModel {


    @Column()
    newsId: number;

    @Column()
    tagId : number

    @ManyToOne(() => News, (news) => news.newsTags)
    @JoinColumn({ name: 'newsId' })
    news: News;

    @ManyToOne(() => Tags, (tag) => tag.newsTags)
    @JoinColumn({ name: 'tagId' })
    tag: Tags;
}