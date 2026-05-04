import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "@/core/base-model";
import type {News} from "@/features/news/news/news.entity";
import type {Branch} from "@/features/organization/branches/branch.entity";

@Entity('countries')
export class Countries extends BaseModel {

  @Column({ type: "varchar", length: 64 })
  title: string;

  @Column({ type: "varchar", length: 256 })
  flag: string;

  @OneToMany('News', 'country')
  news: News[];

  @OneToMany('Branch', 'country')
  branches: Branch[];
}