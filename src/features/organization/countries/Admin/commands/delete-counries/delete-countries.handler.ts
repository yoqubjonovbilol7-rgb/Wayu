import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    DeleteCountriesCommand
} from "@/features/organization/countries/Admin/commands/delete-counries/delete-countries.command";
import {Countries} from "@/features/organization/countries/countries.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {News} from "@/features/news/news/news.entity";


@CommandHandler(DeleteCountriesCommand)
export class DeleteCountriesHandler implements ICommandHandler<DeleteCountriesCommand> {
    async execute(cmd : DeleteCountriesCommand) : Promise<void> {
        const countries = await Countries.findOneBy({id : cmd.id})
        if(!countries) {
            throw new NotFoundException('Countries with given id not found')
        }

        const hasAnyAttachedNews = await News.existsBy({countryId : cmd.id})
        if (hasAnyAttachedNews) {
            throw new BadRequestException('Category has attached Book, move or delete them first')
        }
        await Countries.remove(countries)
    }

}
