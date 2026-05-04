import {Query} from "@nestjs/cqrs";
import {GetOneQuestionResponse} from "@/features/support/questions/Admin/queries/get-one-questions/get-one-question.response";

export class GetOneQuestionQuery extends Query<GetOneQuestionResponse>{
    constructor(public readonly id : number) {
        super();
    }
}
