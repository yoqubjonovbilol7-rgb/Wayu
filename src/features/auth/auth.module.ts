import {Module} from "@nestjs/common";
import {LoginController} from "@/features/auth/login/login.controller";
import {UserController} from "@/features/auth/users/user.controller";
import {CreateUserHandler} from "@/features/auth/users/command/create-user/create-user.handler";
import {CreateLoginAdminHandler} from "@/features/auth/login/command/create-login.admin.handler";

@Module({
  controllers : [LoginController,UserController],
  providers : [
    CreateLoginAdminHandler,
    CreateUserHandler]
})


export class AuthModule {}