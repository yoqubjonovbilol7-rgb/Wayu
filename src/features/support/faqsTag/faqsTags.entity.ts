import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "@/core/base-model";
import { Tags } from "@/features/news/tags/tags.entity";
import { Faq } from "../faqs/faqs.entity";

@Entity("faqs_tags")
export class FaqsTags extends BaseModel {

  @Column()
  tagId: number;

  @Column()
  faqId: number;

  @ManyToOne(() => Tags, (tag) => tag.faqsTags, {onDelete: "CASCADE"})
  @JoinColumn({ name: "tagId" })
  tag: Tags;

  @ManyToOne(() => Faq, (faq) => faq.faqsTags, {onDelete: "CASCADE"})
  @JoinColumn({ name: "faqId" })
  faq: Faq;
}