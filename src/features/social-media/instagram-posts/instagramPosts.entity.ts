import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('InstagramPosts')
export class InstagramPosts extends BaseModel{

    @Column({length : 256})
    image : string

    @Column({length : 256})
    link : string
}