import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateAuthorsCommand} from "@/features/library/authors/Admin/commands/update-authors/update-authors.command";
import {Author} from "@/features/library/authors/author.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateAuthorsResponse} from "@/features/library/authors/Admin/commands/update-authors/update-authors.response";

@CommandHandler(UpdateAuthorsCommand)
export class UpdateAuthorsHandler implements ICommandHandler<UpdateAuthorsCommand> {
    async execute(command : UpdateAuthorsCommand) : Promise<UpdateAuthorsResponse> {
        const authors = await Author.findOne({where : {id : command.id}})
        if (!authors) {
            throw new NotFoundException('id topilmadi')
        }
        if (command.fullName) {
            authors.fullName = command.fullName
        }
        const updateAuthors = await authors.save()
        return plainToInstance(UpdateAuthorsResponse,updateAuthors ,{excludeExtraneousValues : true})

    }
}