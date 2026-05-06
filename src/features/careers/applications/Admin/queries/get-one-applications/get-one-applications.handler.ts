import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { Applications } from "@/features/careers/applications/applications.entity";
import { GetOneApplicationsQuery } from "./get-one-applications.query";
import { GetOneApplicationsResponse } from "./get-one-applications.response";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetOneApplicationsQuery)
export class GetOneApplicationsHandler implements IQueryHandler<GetOneApplicationsQuery> {


  async execute(query: GetOneApplicationsQuery): Promise<GetOneApplicationsResponse> {
    const application = await Applications.findOne({
      where: { id: query.id },
    });

    if (!application) {
      throw new NotFoundException("Application not found");
    }

    return plainToInstance(GetOneApplicationsResponse, application, {
      excludeExtraneousValues: true,
    });
  }
}
