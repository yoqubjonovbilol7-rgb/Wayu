import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Applications} from "@/features/careers/applications/applications.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {
    DeleteVacanciesCommand
} from "@/features/careers/vacancies/Admin/commands/delete-vacancies/delete-vacancies.command";
import {Vacancies} from "@/features/careers/vacancies/vacancies.entity";


@CommandHandler(DeleteVacanciesCommand)
export class DeleteVacanciesHandler implements ICommandHandler<DeleteVacanciesCommand> {
    async execute(cmd: DeleteVacanciesCommand): Promise<void> {
        const vacancy = await Vacancies.findOneBy({id: cmd.id});
        if (!vacancy)
            throw new NotFoundException("Vacancy with given id not found");

        const hasAnyAttachedApplications = await Applications.existsBy({vacancyId: cmd.id});
        if (hasAnyAttachedApplications)
            throw new BadRequestException("Vacancy has attached Applications, move or delete them first");

        await Vacancies.remove(vacancy);
    }
}
