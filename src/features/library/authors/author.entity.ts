import {Column, Entity, OneToMany} from "typeorm";
import { Book } from "@/features/library/book/book.entity";
import {BaseModel} from "@/core/base-model";


@Entity('authors')
export class Author extends BaseModel{


    @Column({type: 'varchar', length: 64})
    fullName: string;

    @OneToMany('Book', 'author')
    books: Book[];
}