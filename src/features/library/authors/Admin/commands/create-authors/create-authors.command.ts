import {Command} from "@nestjs/cqrs";
import {CreateAuthorsResponse} from "@/features/library/authors/Admin/commands/create-authors/create-authors.response";
import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAuthorsCommand extends Command<CreateAuthorsResponse> {
    constructor(public fullName : string) {
        super();
    }
}