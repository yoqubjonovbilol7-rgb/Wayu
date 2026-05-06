import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import {
  GetAllRepresentativesQuery
} from '@/features/organization/representatives/Admin/queries/get-all-representatives/get-all-representatives.query';
import {
  GetAllRepresentativesResponse
} from '@/features/organization/representatives/Admin/queries/get-all-representatives/get-all-representatives.response';
import { Representatives } from '@/features/organization/representatives/representatives.entity';



@QueryHandler(GetAllRepresentativesQuery)
export class GetAllRepresentativesHandler
  implements IQueryHandler<GetAllRepresentativesQuery>
{
  async execute(query: GetAllRepresentativesQuery): Promise<GetAllRepresentativesResponse[]> {
    const take = query.filters?.size ?? 10;
    const page = query.filters?.page ?? 1;
    const skip = (page - 1) * take;

    const representatives = await Representatives.find({
      skip,
      take,

    });

    return plainToInstance(GetAllRepresentativesResponse, representatives, {
      excludeExtraneousValues: true,
    });
  }
}