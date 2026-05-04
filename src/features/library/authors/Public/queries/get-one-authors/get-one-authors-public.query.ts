import {Query} from "@nestjs/cqrs";
import {
    GetOneAuthorsPublicResponse
} from "@/features/library/authors/Public/queries/get-one-authors/get-one-authors-public.response";

export class GetOneAuthorsPublicQuery extends Query<GetOneAuthorsPublicResponse>{
    constructor(public  readonly id : number) {
        super();
    }
}