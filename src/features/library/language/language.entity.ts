import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('Language')
export class Language extends BaseModel{

    @Column({type : "varchar",length : 64})
    title : string
}