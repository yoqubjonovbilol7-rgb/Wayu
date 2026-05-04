import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllSocialLinksQuery} from "@/features/info/social-links/Admin/queries/get-all-social-links/get-all-social-links.query";
import {GetAllSocialLinksResponse} from "@/features/info/social-links/Admin/queries/get-all-social-links/get-all-social-links.response";
import {SocialLinks} from "@/features/info/social-links/socialLinks.entity";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetAllSocialLinksQuery)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksQuery>{
  async execute(query : GetAllSocialLinksQuery) : Promise<GetAllSocialLinksResponse[]>{
    const take = query.filters?.size ?? 10;
    const currentPage = query.filters?.page ?? 1;
    const skip = (currentPage - 1) * take;

    const socialLinks = await SocialLinks.find({skip : skip,take : take})
    return plainToInstance(GetAllSocialLinksResponse,socialLinks,{excludeExtraneousValues : true})
  }
}