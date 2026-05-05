import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ApplicationStatus } from "@/core/enums/paymentProvider.enum";

export class ApplicationResponse {
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
  email!: string;

  @Expose()
  @ApiProperty()
  vacancyId!: number;

  @Expose()
  @ApiProperty({ enum: ApplicationStatus })
  status!: ApplicationStatus;

  @Expose()
  @ApiProperty({ required: false })
  resume?: string;

  @Expose()
  @ApiProperty()
  created!: string;

  @Expose()
  @ApiProperty({ required: false })
  updated?: string;
}

export class GetAllApplicationsResponse {
  @Expose()
  @ApiProperty({ type: [ApplicationResponse] })
  data!: ApplicationResponse[];

  @Expose()
  @ApiProperty()
  total!: number;
}
