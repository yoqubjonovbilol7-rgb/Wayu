import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Vacancies} from "../vacancies/vacancies.entity";
import {BaseModel} from "@/core/base-model";
import {ApplicationStatus} from "@/core/enums/paymentProvider.enum";


@Entity('applications')
export class Applications extends BaseModel {
    @Column({ type: 'varchar', length: 64 })
    fullName: string;

    @Column({ type: 'varchar', length: 16 })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 64 })
    email: string;

    @Column()
    vacancyId: number;

    @Column({type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.ACTIVE})
    status: ApplicationStatus;

    @Column({ type: 'varchar', length: 255, nullable: true })
    resume: string;

    @ManyToOne(() => Vacancies, (vacancy) => vacancy.applications)
    @JoinColumn({ name: 'vacancyId' })
    vacancy: Vacancies;
}