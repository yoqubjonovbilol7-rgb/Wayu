import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {GetAllQuestionsResponse} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.response";
import {GetAllQuestionsFilters} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.filters";
import {GetAllQuestionsQuery} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.query";
import {CreateQuestionResponse} from "@/features/support/questions/Admin/commands/create-questions/create-question.response";
import {CreateQuestionCommand} from "@/features/support/questions/Admin/commands/create-questions/create-question.command";
import {DeleteQuestionCommand} from "@/features/support/questions/Admin/commands/delete-questions/delete-question.command";
import {GetOneQuestionResponse} from "@/features/support/questions/Admin/queries/get-one-questions/get-one-question.response";
import {GetOneQuestionQuery} from "@/features/support/questions/Admin/queries/get-one-questions/get-one-question.query";
import {UpdateQuestionRequest} from "@/features/support/questions/Admin/commands/update-questions/update-question.request";
import {CreateQuestionRequest} from "@/features/support/questions/Admin/commands/create-questions/create-question.request";
import {UpdateQuestionCommand} from "@/features/support/questions/Admin/commands/update-questions/update-question.command";
import {UpdateQuestionResponse} from "@/features/support/questions/Admin/commands/update-questions/update-question.response";

@Controller('admin/questions')
export class QuestionsAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {
    }

    @Get()
    @ApiOkResponse({type: [GetAllQuestionsResponse]})
    async getAllQuestions(@Query() filters: GetAllQuestionsFilters) {
        return await this.queriesBus.execute(new GetAllQuestionsQuery(filters));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateQuestionResponse })
    async createQuestion(@Body() cmd : CreateQuestionRequest) {
        return await this.commandBus.execute(new CreateQuestionCommand(
            cmd.fullName,
            cmd.phoneNumber,
            cmd.question,
        ));
    }

    @Delete(':id')
    async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
        return await this.commandBus.execute(new DeleteQuestionCommand(id));
    }

    @Get(':id')
    @ApiOkResponse({type : GetOneQuestionResponse})
    async getOneQuestion(@Param('id',ParseIntPipe)id : number) {
        return this.queriesBus.execute(new GetOneQuestionQuery(id))
    }

    @Patch(':id')
    @ApiOkResponse({type: UpdateQuestionResponse})
    async updateQuestion(@Param('id', ParseIntPipe) id: number, @Body() cmd: UpdateQuestionRequest){
        return await this.commandBus.execute(new UpdateQuestionCommand(
            id,
            cmd.fullName,
            cmd.phoneNumber,
            cmd.question,
            cmd.status,
        ));
    }

}
