import {Command} from "@nestjs/cqrs";
import {CreateLanguageResponse} from "@/features/library/language/Admin/commands/create-language/create-language.response";
import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateLanguageCommand extends Command<CreateLanguageResponse>{
    constructor(public title : string) {
        super();
    }
}