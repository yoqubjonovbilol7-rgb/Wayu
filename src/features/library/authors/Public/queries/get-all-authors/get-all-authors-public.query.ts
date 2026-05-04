import {Query} from "@nestjs/cqrs";

import {GetAllAuthorsPublicResponse} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.response";
import {GetAllAuthorsPublicFilters} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.filters";


export class GetAllAuthorsPublicQuery extends Query<GetAllAuthorsPublicResponse[]> {
    constructor(public readonly filters : GetAllAuthorsPublicFilters) {
        super();
    }
}