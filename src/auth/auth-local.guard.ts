import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
class AuthLocalGuard extends AuthGuard("local") {}

export default AuthLocalGuard;
