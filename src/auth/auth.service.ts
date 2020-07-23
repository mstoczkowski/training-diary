import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import UsersService from "../users/users.service";
import RegisterUserDto from "./dto/register-user.dto";
import * as bcrypt from "bcrypt";
import { PostgresErrorCodes } from "../database/postgres-error-codes";
import User from "../users/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import TokenPayloadDto from "./dto/token-payload.dto";

@Injectable()
class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(registerData: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registerData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (e) {
      if (e.code === PostgresErrorCodes.UniqueViolation) {
        throw new HttpException(
          "User with that email already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAuthenticatedUser(
    email: string,
    hashedPassword: string
  ): Promise<User> {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(user.password, hashedPassword);
      user.password = undefined;
      return user;
    } catch (e) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  getCookieWithToken(userId: number): string {
    const payload: TokenPayloadDto = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRATION_TIME"
    )}`;
  }

  getCookieForLogOut(): string {
    return "Authentication=; HttpOnly; Path=/; Max-Age=0";
  }

  private async verifyPassword(
    userPassword: string,
    hashedPassword: string
  ): Promise<void> {
    const isAuthenticated = await bcrypt.compare(hashedPassword, userPassword);

    if (!isAuthenticated) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

export default AuthService;
