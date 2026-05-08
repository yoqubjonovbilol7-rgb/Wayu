import {Body, Controller, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CommandBus} from "@nestjs/cqrs";
import {CreateLoginAdminRequest} from "@/features/auth/login/command/create-login.admin.request";
import {CreateLoginAdminCommand} from "@/features/auth/login/command/create-login.admin.command";


@Controller('admin/login')
@ApiTags('Login-Admin')
export class LoginController{
  constructor(private readonly commandBus: CommandBus) {
  }

  @Post()
  async createLogin(@Body()payload: CreateLoginAdminRequest){
    let cmd = new CreateLoginAdminCommand(
      payload.userName,
      payload.password
    )
    return await this.commandBus.execute(cmd)
  }
}