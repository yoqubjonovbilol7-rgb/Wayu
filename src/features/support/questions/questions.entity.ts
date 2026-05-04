import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {QuestionStatus} from "@/core/enums/paymentProvider.enum";

@Entity('questions')
export class Questions extends BaseModel {
    @Column({ type: 'varchar', length: 64 })
    fullName!: string;

    @Column({ type: 'varchar', length: 16 })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 2000 })
    question: string;

    @Column({ type: 'enum', enum: QuestionStatus })
    status: QuestionStatus;
}
