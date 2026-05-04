import {Command} from "@nestjs/cqrs";
import {
    CreateCountriesResponse
} from "@/features/organization/countries/Admin/commands/create-counries/create-countries.response";
import {IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCountriesCommand extends Command<CreateCountriesResponse> {
    constructor(public title :string,public flag : Express.Multer.File) {
        super();

    }
}