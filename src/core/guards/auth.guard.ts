import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Reflector} from '@nestjs/core';
import {Request} from 'express';
import {RolesKey} from "@/core/decorators/roles.decorator";


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(RolesKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Token topilmadi");
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer?.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedException("Noto'g'ri formatdagi token");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY
      });
      request['users'] = payload;
    } catch {
      throw new UnauthorizedException("Token yaroqsiz");
    }


    const user = request['users'];
    return requiredRoles.includes(user.role);
  }
}