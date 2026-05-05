import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Applications } from "@/features/careers/applications/applications.entity";
import { GetAllApplicationsQuery } from "./get-all-applications.query";
import { GetAllApplicationsResponse } from "./get-all-applications.response";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsQuery> {
  constructor(
    @InjectRepository(Applications)
    private readonly repository: Repository<Applications>,
  ) {}

  async execute(query: GetAllApplicationsQuery): Promise<GetAllApplicationsResponse> {
    const {
      page = 1,
      limit = 10,
      fullName,
      email,
      phoneNumber,
      vacancyId,
      status,
    } = query.filters || {};

    const qb = this.repository.createQueryBuilder("application");

    if (fullName) {
      qb.andWhere("application.fullName ILIKE :fullName", {
        fullName: `%${fullName}%`,
      });
    }

    if (email) {
      qb.andWhere("application.email ILIKE :email", {
        email: `%${email}%`,
      });
    }

    if (phoneNumber) {
      qb.andWhere("application.phoneNumber ILIKE :phoneNumber", {
        phoneNumber: `%${phoneNumber}%`,
      });
    }

    if (typeof vacancyId === "number") {
      qb.andWhere("application.vacancyId = :vacancyId", { vacancyId });
    }

    if (status) {
      qb.andWhere("application.status = :status", { status });
    }

    qb.orderBy("application.created", "DESC");

    const [data, total] = await qb.take(limit).skip((page - 1) * limit).getManyAndCount();

    return plainToInstance(
      GetAllApplicationsResponse,
      { data, total },
      { excludeExtraneousValues: true },
    );
  }
}
