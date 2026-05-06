import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Applications } from "@/features/careers/applications/applications.entity";
import { GetAllApplicationsQuery } from "./get-all-applications.query";
import { GetAllApplicationsResponse } from "./get-all-applications.response";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsQuery> {
  async execute(query: GetAllApplicationsQuery): Promise<GetAllApplicationsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const applications = await Applications.find({
      skip,
      take,
    });

    return plainToInstance(GetAllApplicationsResponse, applications, { excludeExtraneousValues: true, });
  }
}