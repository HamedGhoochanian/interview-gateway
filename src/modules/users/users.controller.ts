import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { MongoIdParamDto } from './dto/mongo-id-param.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Inject() private readonly usersService: UsersService;

  @Post()
  @ApiOperation({})
  public createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  @ApiOperation({})
  @ApiResponse({ type: UserResponseDto, isArray: true })
  public listUsers() {
    return this.usersService.listUsers();
  }

  @Get(':id')
  @ApiOperation({})
  @ApiResponse({ type: UserResponseDto })
  public fetchUser(@Param() params: MongoIdParamDto) {
    return this.usersService.fetchUser(params.id);
  }

  @Delete(':id')
  @ApiOperation({})
  public deleteUser(@Param() params: MongoIdParamDto) {
    return this.usersService.deleteUser(params.id);
  }
}
