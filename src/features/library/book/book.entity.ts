import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Author} from "../authors/author.entity";
import {BookCategories} from "@/features/library/bookCategory/bookCategories.entity";
import {BaseModel} from "@/core/base-model";

@Entity('book')
export class Book extends BaseModel {
    @Column()
    authorId: number;

    @Column()
    categoryId : number

    @Column({ type: 'varchar', length: 256 })
    title: string;

    @Column({ type: 'varchar', length: 128 })
    image: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 128 })
    file: string;

    @Column({ type: 'int' })
    pages: number;

    @Column({ type: 'int' })
    year: number;

    @ManyToOne(() => Author, (author) => author.books)
    @JoinColumn({ name: 'authorId' })
    author: Author;

    @ManyToOne(() => BookCategories, (category) => category.books)
    @JoinColumn({ name: "categoryId" })
    category: BookCategories;
}