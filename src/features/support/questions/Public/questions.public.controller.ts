import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllQuestionsPublicQuery } from './queries/get-all-questions/get-all-questions.query';

import { GetAllQuestionsPublicFilters } from './queries/get-all-questions/get-all-questions.filters';
import { GetOneQuestionPublicQuery } from './queries/get-one-questions/get-one-question.query';
import { GetOneQuestionResponse } from './queries/get-one-questions/get-one-question.response';
import {
  QuestionPublicResponse
} from '@/features/support/questions/Public/queries/get-all-questions/get-all-questions.response';

@Controller('public/questions')
export class QuestionsPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: QuestionPublicResponse })
  async getAll(@Query() filters: GetAllQuestionsPublicFilters) {
    return this.queryBus.execute(new GetAllQuestionsPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneQuestionResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetOneQuestionPublicQuery(id));
  }
}

