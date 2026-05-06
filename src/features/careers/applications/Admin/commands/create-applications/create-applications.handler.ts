import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateApplicationsCommand
} from '@/features/careers/applications/Admin/commands/create-applications/create-applications.command';
import {
  CreateApplicationResponse
} from '@/features/careers/applications/Admin/commands/create-applications/create-applications.response';
import { Vacancies } from '@/features/vacancies/vacancies.entity';
import { NotFoundException } from '@nestjs/common';
import { Applications } from '@/features/careers/applications/applications.entity';
import { ApplicationStatus } from '@/core/enums/paymentProvider.enum';
import { plainToInstance } from 'class-transformer';


@CommandHandler(CreateApplicationsCommand)
export class CreateApplicationsHandler implements ICommandHandler<CreateApplicationsCommand> {
  async execute(cmd: CreateApplicationsCommand): Promise<CreateApplicationResponse> {
    const vacancyExists = await Vacancies.findOne({where: { id: cmd.vacancyId }});

    if (!vacancyExists) {
      throw new NotFoundException("Vacancy with given id not found");
    }

    const application = Applications.create({
      fullName: cmd.fullName,
      phoneNumber: cmd.phoneNumber,
      email: cmd.email,
      vacancyId: cmd.vacancyId,
      resume: cmd.resume.path,
      status: ApplicationStatus.ACTIVE,
    });


    const saved = await Applications.save(application);

    return plainToInstance(CreateApplicationResponse, saved, {excludeExtraneousValues: true,});
  }
}