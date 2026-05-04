import {Command} from "@nestjs/cqrs";
import {UpdateLanguageResponse} from "@/features/library/language/Admin/commands/update-language/update-language.response";
import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";

export class UpdateLanguageCommand extends Command<UpdateLanguageResponse> {
    constructor(public id : number,public title? :string) {
        super();
    }
}