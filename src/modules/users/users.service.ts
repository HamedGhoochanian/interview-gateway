import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { plainToInstance } from 'class-transformer';
import { UserListDto, UserResponseDto } from './dto/user-response.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { UserGrpc } from './user-grpc.interface';
import { lastValueFrom } from 'rxjs';
import { GrpcStatus } from '../../enum/grpc-status.enum';
import { UserUpdateDto } from './dto/user-update.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  @Inject('user_package') private client: ClientGrpc;
  private userGrpc: UserGrpc;

  onModuleInit() {
    this.userGrpc = this.client.getService<UserGrpc>('UserService');
  }

  public async createUser(payload: UserCreateDto) {
    const user = await lastValueFrom(this.userGrpc.createUser(payload)).catch(
      UsersService.catchError,
    );
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async deleteUser(id: string) {
    await lastValueFrom(this.userGrpc.deleteUser({ id: id })).catch(
      UsersService.catchError,
    );
  }

  public async listUsers(payload: PaginationDto): Promise<any> {
    const data = await lastValueFrom(this.userGrpc.listUsers(payload)).catch(
      UsersService.catchError,
    );
    console.log(data);
    return plainToInstance(UserListDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public async fetchUser(id: string): Promise<UserResponseDto> {
    const user = await lastValueFrom(this.userGrpc.fetchUser({ id })).catch(
      UsersService.catchError,
    );
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async updateUser(id: string, payload: UserUpdateDto) {
    const result = await lastValueFrom(
      this.userGrpc.updateUser({ id, ...payload }),
    );
    return plainToInstance(UserResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  private static catchError(e) {
    {
      const code = e?.code as number;
      switch (code) {
        case GrpcStatus.NOT_FOUND:
          throw new NotFoundException();
        case GrpcStatus.INVALID_ARGUMENT:
          throw new BadRequestException(e?.details.split(','));
        default:
          throw e;
      }
    }
  }
}
