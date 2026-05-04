import {Query} from "@nestjs/cqrs";
import {GetOneQuestionResponse} from "@/features/support/questions/Public/queries/get-one-questions/get-one-question.response";

export class GetOneQuestionPublicQuery extends Query<GetOneQuestionResponse>{
    constructor(public readonly id : number) {
        super();
    }
}
