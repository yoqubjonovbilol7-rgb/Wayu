import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Faq } from '@/features/support/faqs/faqs.entity';
import { UpdateFaqsCommand } from './update-faqs.command';
import { UpdateFaqsResponse } from './update-faqs.response';

@CommandHandler(UpdateFaqsCommand)
export class UpdateFaqsHandler
    implements ICommandHandler<UpdateFaqsCommand>
{
    async execute(command: UpdateFaqsCommand,): Promise<UpdateFaqsResponse> {
        const faq = await Faq.findOneBy({ id: command.id });
        if (!faq) {
            throw new NotFoundException('FAQ not found');
        }
        if (command.question) {
            const exists = await Faq.existsBy({question: command.question,});
            if (exists) {
                throw new BadRequestException('Question already exists');
            }
            faq.question = command.question;
        }
        if (command.answer) {
            faq.answer = command.answer;
        }
        const updated = await Faq.save(faq);
        return plainToInstance(UpdateFaqsResponse, updated, {excludeExtraneousValues: true,});
    }
}