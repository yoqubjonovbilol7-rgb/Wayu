import {Command} from "@nestjs/cqrs";
import {CreateBooksResponse} from "./create-books.response";


export class CreateBooksCommand extends Command<CreateBooksResponse> {
    constructor(public authorId: number, public categoryId: number, public title: string, public description: string | undefined, public pages: number, public year: number, public imagePath: string, public filePath: string) {
        super();
    }
}