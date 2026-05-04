import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {Command} from "@nestjs/cqrs";
import { UpdateEventsCategoryResponse } from "./update-events-category.response";

export class UpdateEventsCategoryCommand extends Command<UpdateEventsCategoryResponse>{
    constructor(public id : number,public title :string) {
        super();
    }
}