import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllStaticInfoQuery } from './get-all-static-info.query';
import { GetAllStaticInfoResponse } from './get-all-static-info.response';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';

@QueryHandler(GetAllStaticInfoQuery)
export class GetAllStaticInfoHandler implements IQueryHandler<GetAllStaticInfoQuery> {
  async execute(query: GetAllStaticInfoQuery,): Promise<GetAllStaticInfoResponse[]> {
    const take = query.filters?.size ?? 10;
    const currentPage = query.filters?.page ?? 1;
    const skip = (currentPage - 1) * take;

    const staticInfos = await StaticInfo.find({skip : skip, take : take,});

    return plainToInstance(GetAllStaticInfoResponse, staticInfos, {excludeExtraneousValues: true,});
  }
}