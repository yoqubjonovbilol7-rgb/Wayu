import {Query} from "@nestjs/cqrs";
import {GetAllQuestionsFilters} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.filters";
import {GetAllQuestionsResponse} from "@/features/support/questions/Admin/queries/get-all-questions/get-all-questions.response";

export class GetAllQuestionsQuery extends Query<GetAllQuestionsResponse[]> {
    constructor(public readonly filters: GetAllQuestionsFilters) {
        super();
    }
}
