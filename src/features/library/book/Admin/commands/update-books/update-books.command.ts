import {Command} from "@nestjs/cqrs";
import {UpdateBooksResponse} from "./update-books.response";

export class UpdateBooksCommand extends Command<UpdateBooksResponse>{
    constructor(public id: number, public authorId?: number, public categoryId?: number, public title?: string, public description?: string, public pages?: number, public year?: number, public imagePath?: string, public filePath?: string) {
        super();
    }
}