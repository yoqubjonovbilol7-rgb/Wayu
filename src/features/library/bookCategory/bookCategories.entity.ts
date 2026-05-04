import {Column, Entity, OneToMany} from "typeorm";
import { Book } from "@/features/library/book/book.entity";
import {BaseModel} from "@/core/base-model";

@Entity('bookCategories')
export class BookCategories extends BaseModel {

    @Column({ type: 'varchar', length: 64 })
    title: string;

    @OneToMany('Book', 'category')
    books: Book[];
}