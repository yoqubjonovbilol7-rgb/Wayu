import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    CreateBookCategoryCommand
} from "@/features/library/bookCategory/Admin/commands/create-book-category/create-book-category.command";
import {
    CreateBookCategoryResponse
} from "@/features/library/bookCategory/Admin/commands/create-book-category/create-book-category.response";
import {BookCategories} from "@/features/library/bookCategory/bookCategories.entity";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";


@CommandHandler(CreateBookCategoryCommand)
export class CreateBookCategoryHandler implements ICommandHandler<CreateBookCategoryCommand> {
    async execute(command : CreateBookCategoryCommand) : Promise<CreateBookCategoryResponse> {
        const alreadyExists = await BookCategories.existsBy({title : command.title})
        if (alreadyExists) {
            throw new BadRequestException('Title is already taken')
        }

        const  newBookCategory = BookCategories.create({title : command.title} as BookCategories)
        await BookCategories.save(newBookCategory)
        return plainToInstance(CreateBookCategoryResponse,newBookCategory,{excludeExtraneousValues : true})
    }
    
}