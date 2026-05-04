import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";


@Entity('StaticInfo')
export class StaticInfo extends BaseModel{

    @Column({length : 128})
    appStoreLink : string

    @Column({length : 128})
    playMarketLink : string

    @Column({type : "text"})
    aboutUs : string
}