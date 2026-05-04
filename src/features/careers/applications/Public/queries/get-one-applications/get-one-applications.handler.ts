import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Applications } from '@/features/careers/applications/applications.entity';
import { GetOneApplicationPublicQuery } from './get-one-applications.query';
import { GetOneApplicationPublicResponse } from './get-one-applications.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneApplicationPublicQuery)
export class GetOneApplicationPublicHandler implements IQueryHandler<GetOneApplicationPublicQuery> {
  constructor(private readonly manager: EntityManager) {}

  async execute(query: GetOneApplicationPublicQuery): Promise<GetOneApplicationPublicResponse> {
    const application = await this.manager.findOne(Applications, {
      where: { id: query.id },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return plainToInstance(GetOneApplicationPublicResponse, application, {
      excludeExtraneousValues: true,
    });
  }
}