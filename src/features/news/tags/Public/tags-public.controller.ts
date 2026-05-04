import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {GetAllTagsResponse} from "@/features/news/tags/Public/queries/get-all-tags/get-all-tags.response";
import {GetAllTagsFilters} from "@/features/news/tags/Public/queries/get-all-tags/get-all-tags.filters";
import {GetAllTagsPublicQuery} from "@/features/news/tags/Public/queries/get-all-tags/get-all-tags.query";
import {GetOneTagsPublicResponse} from "@/features/news/tags/Public/queries/get-one-tags/get-one-tags-public.response";
import {GetOneTagsPublicQuery} from "@/features/news/tags/Public/queries/get-one-tags/get-one-tags-public.query";

@Controller('public/tags')
export class TagsPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get()
  @ApiOkResponse({type: [GetAllTagsResponse]})
  async getAllTags(@Query() filters: GetAllTagsFilters) {
    return this.queryBus.execute(new GetAllTagsPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneTagsPublicResponse })
  async getOneTag(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(
      new GetOneTagsPublicQuery(id),
    );
  }
}