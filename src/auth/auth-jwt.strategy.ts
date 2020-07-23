import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import UsersService from "../users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import TokenPayloadDto from "./dto/token-payload.dto";
import User from "../users/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: TokenPayloadDto): Promise<User> {
    return this.usersService.getUserById(payload.userId);
  }
}

export default AuthJwtStrategy;
