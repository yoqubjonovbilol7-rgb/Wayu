import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    DeleteLanguageCommand
} from "@/features/library/language/Admin/commands/delete-language/delete-language.command";
import {Language} from "@/features/library/language/language.entity";
import {NotFoundException} from "@nestjs/common";


@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand> {
    async execute(cmd : DeleteLanguageCommand) : Promise<void> {
        const language = await Language.findOneBy({id : cmd.id})
        if (!language) {
            throw new NotFoundException('Language with given id not found')
        }

        await Language.remove(language)
    }
}