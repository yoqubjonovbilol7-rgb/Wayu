import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Representatives } from "../representatives/representatives.entity";
import { Countries } from "../countries/countries.entity";
import { BaseModel } from "@/core/base-model";

@Entity('branch')
export class Branch extends BaseModel {

  @Column()
  countryId: number;

  @Column()
  representativeId: number;

  @Column({ length: 64 })
  city: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ length: 16 })
  phoneNumber: string;

  @ManyToOne(() => Countries, (country) => country.branches, {onDelete: "CASCADE"})
  @JoinColumn({ name: "countryId" })
  country: Countries;

  @ManyToOne(() => Representatives, (rep) => rep.branches)
  @JoinColumn({ name: "representativeId" })
  representative: Representatives;
}