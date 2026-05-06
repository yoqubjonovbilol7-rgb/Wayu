import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import { UsefulLinks } from '@/features/info/useful-links/usefulLinks.entity';
import { GetAllUsefulLinksPublicQuery } from './get-all-useful-links.query';
import { UsefulLinkPublicResponse } from './get-all-useful-links.response';


@QueryHandler(GetAllUsefulLinksPublicQuery) export class GetAllUsefulLinksPublicHandler implements IQueryHandler<GetAllUsefulLinksPublicQuery> {

  async execute(query: GetAllUsefulLinksPublicQuery) : Promise<UsefulLinkPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const data = await UsefulLinks.find({
      skip : skip,
      take: take,

    });

    return plainToInstance(UsefulLinkPublicResponse , data, { excludeExtraneousValues: true,
    });
  }
}