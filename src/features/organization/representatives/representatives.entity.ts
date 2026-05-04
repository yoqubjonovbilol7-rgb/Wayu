import {Column, Entity, OneToMany} from "typeorm";
import { Branch } from "../branches/branch.entity";
import {BaseModel} from "@/core/base-model";


@Entity('representatives')
export class Representatives extends BaseModel {


    @Column({ length: 64 })
    fullName: string;

    @Column({ length: 128 })
    image: string;

    @Column({ length: 64 })
    email: string;

    @Column({ length: 16 })
    phoneNumber: string;

    @Column('text')
    resume: string;

    @OneToMany('Branch', 'representative')
    branches: Branch[];
}