import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    UpdateLanguageCommand
} from "@/features/library/language/Admin/commands/update-language/update-language.command";
import {
    UpdateLanguageResponse
} from "@/features/library/language/Admin/commands/update-language/update-language.response";
import {Language} from "@/features/library/language/language.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand> {

    async execute(command : UpdateLanguageCommand) : Promise<UpdateLanguageResponse> {
        const language = await Language.findOne({where : {id : command.id}})
        if (!language) {
            throw new NotFoundException('id topilmadi')
        }
        if (command.title){
            language.title = command.title
        }

        const updateLanguage = await language.save()
        return  plainToInstance(UpdateLanguageResponse,updateLanguage,{excludeExtraneousValues :true})
    }
}