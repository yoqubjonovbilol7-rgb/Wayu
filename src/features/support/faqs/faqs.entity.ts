import {Column, Entity, OneToMany} from "typeorm";
import { FaqsTags } from "../faqsTag/faqsTags.entity";
import {BaseModel} from "@/core/base-model";


@Entity('faqs')
export class Faq extends BaseModel{

    @Column({ length: 256 })
    question: string;

    @Column({ length: 512 })
    answer: string;

    @OneToMany('FaqsTags', 'faq')
    faqsTags: FaqsTags[];
}