import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { User } from './user.interface';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private static readonly users: User[] = [];

  public createUser(payload: CreateUserDto) {
    const randomId = UsersService.generateId();
    UsersService.users.push({
      _id: randomId,
      birthday: new Date(payload.birthday),
      name: payload.name,
      email: payload.email,
      isDeleted: false,
    });
  }

  public deleteUser(_id: string) {
    const user = UsersService.users.find(
      (u) => u._id === _id && u.isDeleted === false,
    );
    if (!user) {
      throw new BadRequestException();
    }
    user.isDeleted = true;
  }

  public listUsers(): UserResponseDto[] {
    const users = UsersService.users.filter((u) => u.isDeleted === false);
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  public fetchUser(_id: string): UserResponseDto {
    const user = UsersService.users.find(
      (u) => u._id === _id && u.isDeleted === false,
    );
    if (!user) {
      throw new NotFoundException();
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  private static generateId() {
    while (true) {
      const randomId = crypto.randomBytes(12).toString('hex');
      const existingUser = UsersService.users.find((u) => u._id === randomId);
      if (!existingUser) {
        return randomId;
      }
    }
  }
}
