import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import AuthService from "./auth.service";
import { UsersModule } from "../users/users.module";
import AuthLocalStrategy from "./auth-local.strategy";
import AuthController from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import AuthJwtStrategy from "./auth-jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get("JWT_SECRET"),
          signOptions: {
            expiresIn: configService.get("JWT_EXPIRATION_TIME"),
          },
        };
      },
    }),
  ],
  providers: [AuthService, AuthLocalStrategy, AuthJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
