import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('UsefulLinks')
export class UsefulLinks extends BaseModel {
    @Column({type : "varchar",length : 128})
    title : string

    @Column({type : "varchar",length : 128})
    icon : string

    @Column({type : "varchar",length : 128})
    link : string
}