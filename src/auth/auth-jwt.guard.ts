import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
class AuthJwtGuard extends AuthGuard("jwt") {}

export default AuthJwtGuard;
