import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Applications } from "@/features/careers/applications/applications.entity";
import { GetAllApplicationsPublicQuery } from "./get-all-applications.query";
import { GetAllApplicationsPublicResponse } from "./get-all-applications.response";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetAllApplicationsPublicQuery)
export class GetAllApplicationsPublicHandler
  implements IQueryHandler<GetAllApplicationsPublicQuery>
{
  async execute(query: GetAllApplicationsPublicQuery) : Promise<GetAllApplicationsPublicResponse[]> {
    const take = query.filters?.size ?? 10;
    const page = query.filters?.page ?? 1;
    const skip = (page - 1) * take;

    const applications = await Applications.find({
      skip,
      take,
    });

    return plainToInstance(GetAllApplicationsPublicResponse, applications, { excludeExtraneousValues: true},
    );
  }
}