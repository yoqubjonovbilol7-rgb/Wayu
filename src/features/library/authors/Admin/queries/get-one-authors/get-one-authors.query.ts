import {Query} from "@nestjs/cqrs";
import {GetOneAuthorsResponse} from "@/features/library/authors/Admin/queries/get-one-authors/get-one-authors.response";

export class GetOneAuthorsQuery extends Query<GetOneAuthorsResponse> {
    constructor(public readonly id : number) {
        super();
    }
}