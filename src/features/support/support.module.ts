import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import {CreateFaqsHandler} from "@/features/support/faqs/Admin/command/create-faqs/create-faqs.handler";
import {DeleteFaqsHandler} from "@/features/support/faqs/Admin/command/delete-faqs/delete-faqs.handler";
import {UpdateFaqsHandler} from "@/features/support/faqs/Admin/command/update-faqs/update-faqs.handler";
import {GetAllFaqsHandler} from "@/features/support/faqs/Admin/queries/get-all-faqs/get-all-faqs.handler";
import {FaqsAdminController} from "@/features/support/faqs/Admin/faqs-admin.controller";
import {GetOneFaqsHandler} from "@/features/support/faqs/Admin/queries/get-one-faqs/get-one-faqs-admin.handler";
import {FaqsPublicController} from "@/features/support/faqs/Public/faqs-public.controller";
import {GetAllFaqsPublicHandler} from "@/features/support/faqs/Public/queries/get-all-faqs/get-all-faqs.handler";
import {GetOneFaqsPublicHandler} from "@/features/support/faqs/Public/queries/get-one-faqs/get-one-faqs-public.handler";
import { QuestionsPublicController } from '@/features/support/questions/Public/questions.public.controller';
import { GetAllQuestionsPublicHandler } from '@/features/support/questions/Public/queries/get-all-questions/get-all-questions.handler';
import {QuestionsAdminController} from "@/features/support/questions/Admin/questions.admin.controller";
import {CreateQuestionHandler} from "@/features/support/questions/Admin/commands/create-questions/create-question.handler";
import {UpdateQuestionHandler} from "@/features/support/questions/Admin/commands/update-questions/update-question.handler";
import {DeleteQuestionHandler} from "@/features/support/questions/Admin/commands/delete-questions/delete-question.handler";
import {GetAllQuestionsHandler} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.handler";
import {GetOneQuestionHandler} from "@/features/support/questions/Admin/queries/get-one-questions/get-one-question.handler";
import {Questions} from '@/features/support/questions/questions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Questions])],
    controllers : [FaqsAdminController, FaqsPublicController, QuestionsAdminController, QuestionsPublicController],
    providers : [
        CreateFaqsHandler,
        DeleteFaqsHandler,
        UpdateFaqsHandler,
        GetAllFaqsHandler,
        GetOneFaqsHandler,
        GetAllFaqsPublicHandler,
        GetOneFaqsPublicHandler,
        GetAllQuestionsPublicHandler,
        CreateQuestionHandler,
        UpdateQuestionHandler,
        DeleteQuestionHandler,
        GetAllQuestionsHandler,
        GetOneQuestionHandler,
    ]
})



export class SupportModule {}