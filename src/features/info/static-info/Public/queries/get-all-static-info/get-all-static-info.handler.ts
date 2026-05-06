import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '@/features/info/static-info/staticInfo.entity';
import { GetAllStaticInfoPublicQuery } from './get-all-static-info.query';
import {
  StaticInfoPublicResponse
} from '@/features/info/static-info/Public/queries/get-all-static-info/get-all-static-info.response';


@QueryHandler(GetAllStaticInfoPublicQuery)
export class GetAllStaticInfoPublicHandler implements IQueryHandler<GetAllStaticInfoPublicQuery> {
  async execute(query: GetAllStaticInfoPublicQuery) : Promise<StaticInfoPublicResponse []> {
    const take = query.filters?.size ?? 10;
    const page = query.filters?.page ?? 1;
    const skip = (page - 1) * take;

    const data = await StaticInfo.find({
      skip :skip,
      take :skip,

    });

    return plainToInstance(StaticInfoPublicResponse , data, { excludeExtraneousValues: true});
  }
}