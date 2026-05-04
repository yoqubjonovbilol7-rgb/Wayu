import {Query} from "@nestjs/cqrs";
import {GetOneBooksAdminResponse} from "./get-one-books-admin.response";

export class GetOneBooksAdminQuery extends Query<GetOneBooksAdminResponse>{
    constructor(public readonly id : number) {
        super();
    }
}