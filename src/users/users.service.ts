import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      return user;
    }

    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ id });

    if (user) {
      return user;
    }

    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}

export default UsersService;
