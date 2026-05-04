import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateAuthorsCommand} from "@/features/library/authors/Admin/commands/create-authors/create-authors.command";
import {Author} from "@/features/library/authors/author.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CreateAuthorsResponse} from "@/features/library/authors/Admin/commands/create-authors/create-authors.response";


@CommandHandler(CreateAuthorsCommand)
export class CreateAuthorsHandler implements ICommandHandler<CreateAuthorsCommand> {
    async execute(command : CreateAuthorsCommand) : Promise<CreateAuthorsResponse> {
        const alreadyExists = await Author.existsBy(({fullName : ILike(command.fullName)}));
        if (alreadyExists) {
            throw new BadRequestException('FullName is already taken')
        }
        const newAuthors = Author.create({fullName : command.fullName} as Author)
        await Author.save(newAuthors);
        return plainToInstance(CreateAuthorsResponse,newAuthors,{excludeExtraneousValues : true});
    }
}