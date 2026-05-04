import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";

import { UsefulLinks } from "@/features/info/useful-links/usefulLinks.entity";
import {GetAllUsefulLinksQuery} from "@/features/info/useful-links/Admin/queries/get-all-social-links/get-all-useful-links.query";
import {GetAllUsefulLinksResponse} from "@/features/info/useful-links/Admin/queries/get-all-social-links/get-all-useful-links.response";

@QueryHandler(GetAllUsefulLinksQuery)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksQuery> {
  async execute(query: GetAllUsefulLinksQuery): Promise<GetAllUsefulLinksResponse[]> {

    const take = query.filters?.size ?? 10;
    const currentPage = query.filters?.page ?? 1;
    const skip = (currentPage - 1) * take;

    const usefulLinks = await UsefulLinks.find({skip :skip, take : take,});

    return plainToInstance(GetAllUsefulLinksResponse, usefulLinks, { excludeExtraneousValues: true });
  }
}