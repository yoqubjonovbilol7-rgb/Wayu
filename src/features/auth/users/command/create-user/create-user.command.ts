import {Command} from "@nestjs/cqrs";
import {Role} from "@/core/enums/role.enum";
import {CreateUserResponse} from "@/features/auth/users/command/create-user/create-user.response";


export class CreateUserCommand extends Command<CreateUserResponse>{
  constructor(
    public role: Role,
    public userName: string,
    public fullName: string,
    public password: string,
    public birthDate: string,
    public isVerified: boolean,
    public isActive: boolean,
  ) {
    super();
  }
}