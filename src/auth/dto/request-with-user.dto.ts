import { Request } from "express";
import User from "../../users/user.entity";

export interface RequestWithUserDto extends Request {
  user: User;
}
