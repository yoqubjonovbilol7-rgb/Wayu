import {Body, Controller, Post} from "@nestjs/common";
import {ApiBearerAuth, ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Roles} from "@/core/decorators/roles.decorator";
import {Role} from "@/core/enums/role.enum";
import {CreateUserResponse} from "@/features/auth/users/command/create-user/create-user.response";
import {CreateUserRequest} from "@/features/auth/users/command/create-user/create-user.request";
import {CreateUserCommand} from "@/features/auth/users/command/create-user/create-user.command";



@Controller('admin/user')
@ApiTags('User-Admin')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Post()
  @Roles(Role.SuperAdmin)
  @ApiCreatedResponse({type: CreateUserResponse})
  async createUser(@Body() payload: CreateUserRequest) {
    let cmd = new CreateUserCommand(
      payload.role,
      payload.userName,
      payload.fullName,
      payload.password,
      payload.birthDate,
      payload.isVerified,
      payload.isActive,
    )

    return await this.commandBus.execute(cmd)
  }
}