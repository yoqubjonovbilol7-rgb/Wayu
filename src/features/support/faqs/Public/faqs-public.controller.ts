import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {GetAllFaqsResponse} from "@/features/support/faqs/Public/queries/get-all-faqs/get-all-faqs.response";
import {GetAllFaqsFilters} from "@/features/support/faqs/Public/queries/get-all-faqs/get-all-faqs.filters";
import {GetAllFaqsQuery} from "@/features/support/faqs/Public/queries/get-all-faqs/get-all-faqs.query";
import {GetOneFaqsResponse} from "@/features/support/faqs/Public/queries/get-one-faqs/get-one-faqs-public.response";
import {GetOneFaqsQuery} from "@/features/support/faqs/Public/queries/get-one-faqs/get-one-faqs-public.query";

@Controller('public/faqs')
export class FaqsPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllFaqsResponse] })
  async getAllFaqs(@Query() filters: GetAllFaqsFilters) {
    return this.queryBus.execute(new GetAllFaqsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqsResponse })
  async getOneFaq(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneFaqsQuery(id));
  }
}