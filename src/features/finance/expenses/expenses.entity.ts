import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('Expenses')
export class Expenses extends BaseModel {
    @Column({type: "decimal", precision: 12, scale: 2 })
    amount : string

    @Column({type : "timestamp"})
    date : Date

    @Column({type : "varchar",length : 256})
    title : string

    @Column({type : "text"})
    description : string

    @Column({type : "varchar",length : 64})
    transaction : string
}