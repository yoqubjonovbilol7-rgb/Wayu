import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllSocialLinksPublicQuery } from './queries/get-all-social-links/get-all-social-links.query';
import { GetAllSocialLinksPublicResponse } from './queries/get-all-social-links/get-all-social-links.response';
import { GetAllSocialLinksPublicFilters } from './queries/get-all-social-links/get-all-social-links.filters';
import { GetOneSocialLinkPublicQuery } from './queries/get-one-social-links/get-one-social-links.query';
import { GetOneSocialLinkPublicResponse } from './queries/get-one-social-links/get-one-social-links.response';

@Controller('public/social-links')
export class SocialLinksPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: GetAllSocialLinksPublicResponse })
  async getAll(@Query() filters: GetAllSocialLinksPublicFilters) {
    return this.queryBus.execute(new GetAllSocialLinksPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinkPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneSocialLinkPublicQuery(id));
  }
}