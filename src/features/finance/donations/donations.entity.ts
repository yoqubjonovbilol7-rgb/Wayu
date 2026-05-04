import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {PaymentProvider} from "@/core/enums/paymentProvider.enum";


@Entity('Donations')
export class Donations extends BaseModel{
    @Column({ type: "decimal", precision: 12, scale: 2 })
    amount : string

    @Column({type : "varchar",length : 64})
    fullName : string

    @Column({type : "timestamp"})
    date : Date

    @Column({type : "enum",enum : PaymentProvider})
    paidBy : PaymentProvider
}