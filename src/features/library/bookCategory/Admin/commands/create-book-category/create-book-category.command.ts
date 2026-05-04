import {Command} from "@nestjs/cqrs";
import {CreateBookCategoryResponse} from "@/features/library/bookCategory/Admin/commands/create-book-category/create-book-category.response";
import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBookCategoryCommand extends Command<CreateBookCategoryResponse> {
    constructor(public title : string) {
        super();
    }
}