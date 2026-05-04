import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {NotFoundException } from '@nestjs/common';
import { DeleteFaqsCommand } from './delete-faqs.command';
import { Faq } from '@/features/support/faqs/faqs.entity';

@CommandHandler(DeleteFaqsCommand)
export class DeleteFaqsHandler
    implements ICommandHandler<DeleteFaqsCommand>
{
    async execute(cmd: DeleteFaqsCommand): Promise<void> {
        const faq = await Faq.findOneBy({ id: cmd.id });
        if (!faq) {
            throw new NotFoundException('FAQ not found');
        }
        await Faq.remove(faq);
    }
}