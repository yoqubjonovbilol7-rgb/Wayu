import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    CreateLanguageCommand
} from "@/features/library/language/Admin/commands/create-language/create-language.command";
import {
    CreateLanguageResponse
} from "@/features/library/language/Admin/commands/create-language/create-language.response";
import {Language} from "@/features/library/language/language.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand>{
    async execute(command : CreateLanguageCommand) : Promise<CreateLanguageResponse> {
        const alreadyExists = await Language.existsBy({title :ILike(command.title)})
        if (alreadyExists) {
            throw new BadRequestException('Title is already taken')
        }
        const newLanguage = Language.create({title :command.title} as Language);
        await Language.save(newLanguage)
        return plainToInstance(CreateLanguageResponse,newLanguage,{excludeExtraneousValues: true})
    }
}
