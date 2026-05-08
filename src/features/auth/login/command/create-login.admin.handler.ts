import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UnauthorizedException} from "@nestjs/common";
import argon2 from 'argon2'
import {JwtService} from "@nestjs/jwt";
import {plainToInstance} from "class-transformer";
import {Users} from "@/features/auth/users.entity";
import {CreateLoginAdminResponse} from "@/features/auth/login/command/create-login.admin.response";
import {CreateLoginAdminCommand} from "@/features/auth/login/command/create-login.admin.command";


@CommandHandler(CreateLoginAdminCommand)
export class CreateLoginAdminHandler implements ICommandHandler<CreateLoginAdminCommand> {
  constructor(private readonly jwtService: JwtService) {
  }
  async execute(command: CreateLoginAdminCommand): Promise<CreateLoginAdminResponse> {
    let user = await Users.findOneBy({userName: command.userName})
    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    if (!user.isActive) {
      throw new UnauthorizedException();
    }

    let passwordsMatch = await argon2.verify(user.password, command.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException();
    }

    let userPayload = {
      id: user.id,
      role: user.role,
    };

    let accessToken = this.jwtService.sign(userPayload)

    return plainToInstance(CreateLoginAdminResponse, accessToken,{excludeExtraneousValues: true})
  }
}