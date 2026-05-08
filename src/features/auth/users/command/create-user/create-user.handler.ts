import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import argon2 from "argon2";
import {BadRequestException} from "@nestjs/common";
import {CreateUserCommand} from "@/features/auth/users/command/create-user/create-user.command";
import {CreateUserResponse} from "@/features/auth/users/command/create-user/create-user.response";
import {Users} from "@/features/auth/users.entity";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  async execute(cmd: CreateUserCommand): Promise<CreateUserResponse> {

    const alreadyExists = await Users.findOneBy({userName: cmd.userName})
    if (alreadyExists) {
      throw new BadRequestException('userName alreadyExists')
    }

    const passwordHash = await argon2.hash(cmd.password)

    const user = Users.create({
      role: cmd.role,
      userName: cmd.userName,
      fullName: cmd.fullName,
      password: passwordHash,
      birthDate: cmd.birthDate,
      isVerified: cmd.isVerified,
      isActive: cmd.isActive
    })

    await Users.save(user)
    return plainToInstance(CreateUserResponse, user, {excludeExtraneousValues: true})
  }
}