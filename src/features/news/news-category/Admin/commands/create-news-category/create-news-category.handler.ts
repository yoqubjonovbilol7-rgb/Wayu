import {CreateNewsCategoryCommand} from './create-news-category.command';
import {CreateNewsCategoryResponse} from './create-news-category.response';
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NewsCategories} from "@/features/news/news-category/newsCategories.entity";

@CommandHandler(CreateNewsCategoryCommand)
export class CreateNewsCategoryHandler implements ICommandHandler<CreateNewsCategoryCommand> {

    async execute(command: CreateNewsCategoryCommand): Promise<CreateNewsCategoryResponse> {
        const alreadyExists = await NewsCategories.existsBy({title: ILike(command.title)});
        if (alreadyExists)
            throw new BadRequestException("Title is already taken");

        const newNewsCategory = NewsCategories.create({title: command.title} as NewsCategories);
        await NewsCategories.save(newNewsCategory);

        return plainToInstance(CreateNewsCategoryResponse, newNewsCategory, {excludeExtraneousValues: true});
    }
}