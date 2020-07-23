import { Request } from "express";
import User from "../../users/user.entity";

interface RequestWithUserDto extends Request {
  user: User;
}

export default RequestWithUserDto;
