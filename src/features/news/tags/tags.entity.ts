import { Column, Entity, OneToMany } from "typeorm";
import { NewsTag } from "@/features/news/newsTag/NewsTag.entity";
import { FaqsTags } from "@/features/support/faqsTag/faqsTags.entity";
import { BaseModel } from "@/core/base-model";

@Entity('tags')
export class Tags extends BaseModel {

  @Column({ length: 64 })
  title: string;

  @OneToMany('NewsTag', 'tag')
  newsTags: NewsTag[];

  @OneToMany('FaqsTags', 'tag')
  faqsTags: FaqsTags[];
}