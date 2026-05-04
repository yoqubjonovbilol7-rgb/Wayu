import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuestionResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullName!: string;

    @Expose()
    @ApiProperty()
    phoneNumber!: string;

    @Expose()
    @ApiProperty()
    question!: string;

    @Expose()
    @ApiProperty()
    status!: string;
}
