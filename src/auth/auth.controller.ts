import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import AuthService from "./auth.service";
import RegisterUserDto from "./dto/register-user.dto";
import RequestWithUserDto from "./dto/request-with-user.dto";
import User from "../users/user.entity";
import AuthLocalGuard from "./auth-local.guard";
import { Response } from "express";
import AuthJwtGuard from "./auth-jwt.guard";

@Controller("auth")
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registrationData: RegisterUserDto): Promise<User> {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(AuthLocalGuard)
  @Post("log-in")
  async logIn(@Req() request: RequestWithUserDto, @Res() response: Response) {
    const { user } = request;
    user.password = undefined;
    const cookie = this.authService.getCookieWithToken(user.id);
    response.setHeader("Set-Cookie", cookie);

    return response.send(user);
  }

  @UseGuards(AuthJwtGuard)
  @Post("log-out")
  async logOut(@Req() request: RequestWithUserDto, @Res() response: Response) {
    response.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(AuthJwtGuard)
  @Get()
  authenticate(@Req() request: RequestWithUserDto) {
    const { user } = request;
    user.password = undefined;

    return user;
  }
}

export default AuthController;
