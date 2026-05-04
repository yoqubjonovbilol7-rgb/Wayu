import {Query} from "@nestjs/cqrs";
import {GetOneInstagramPostsAdminResponse} from "./get-one-instagram-posts-admin.response";

export class GetOneInstagramPostsAdminQuery extends Query<GetOneInstagramPostsAdminResponse>{
    constructor(public readonly id : number) {
        super();
    }
}