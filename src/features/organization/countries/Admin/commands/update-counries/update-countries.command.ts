import {Command} from "@nestjs/cqrs";
import {UpdateCountriesResponse} from "@/features/organization/countries/Admin/commands/update-counries/update-countries.response";


export class UpdateCountriesCommand extends Command<UpdateCountriesResponse>{
    constructor(public id : number,public title?: string,public flag?: Express.Multer.File) {
        super();
    }
}