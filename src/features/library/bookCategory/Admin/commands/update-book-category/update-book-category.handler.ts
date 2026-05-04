import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    UpdateBookCategoryCommand
} from "@/features/library/bookCategory/Admin/commands/update-book-category/update-book-category.command";
import {
    UpdateBookCategoryResponse
} from "@/features/library/bookCategory/Admin/commands/update-book-category/update-book-category.response";
import {BookCategories} from "@/features/library/bookCategory/bookCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@CommandHandler(UpdateBookCategoryCommand)
export class UpdateBookCategoryHandler implements ICommandHandler<UpdateBookCategoryCommand>{
    async execute(command : UpdateBookCategoryCommand) :Promise<UpdateBookCategoryResponse> {
        const category = await BookCategories.findOne({where:{id : command.id}})
        if(!category){
            throw new NotFoundException('id topilmadi')
        }
        if(command.title){
            category.title = command.title
        }

        const updatedCategory = await category.save();
        return  plainToInstance(UpdateBookCategoryResponse,updatedCategory,{excludeExtraneousValues :true})
    }
}