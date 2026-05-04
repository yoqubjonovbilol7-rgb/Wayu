import { CreateFaqsCommand } from './create-faqs.command';
import { CreateFaqsResponse } from './create-faqs.response';
import { ILike } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {Faq} from "@/features/support/faqs/faqs.entity";


@CommandHandler(CreateFaqsCommand)
export class CreateFaqsHandler implements ICommandHandler<CreateFaqsCommand> {
    async execute(command: CreateFaqsCommand,): Promise<CreateFaqsResponse> {

        const alreadyExists = await Faq.existsBy({question: ILike(command.question),answer : ILike(command.question)});

        if (alreadyExists) {
            throw new BadRequestException('Question already exists');
        }

        const newFaq = Faq.create({question: command.question, answer: command.answer,} as Faq);

        await Faq.save(newFaq);

        return plainToInstance(CreateFaqsResponse, newFaq, { excludeExtraneousValues: true },);
    }
}