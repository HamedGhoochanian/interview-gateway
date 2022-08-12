import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserListDto, UserResponseDto } from './dto/user-response.dto';
import { MongoIdParamDto } from './dto/mongo-id-param.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Inject() private readonly usersService: UsersService;

  @Post()
  @ApiOperation({})
  @ApiResponse({ type: UserResponseDto })
  public createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }

  @Get()
  @ApiOperation({})
  @ApiResponse({ type: UserListDto })
  public listUsers(@Query() query: PaginationDto) {
    return this.usersService.listUsers(query);
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

  @Patch(':id')
  @ApiOperation({})
  @ApiResponse({ type: UserResponseDto })
  public updateUser(
    @Param() params: MongoIdParamDto,
    @Body() body: UserUpdateDto,
  ) {
    return this.usersService.updateUser(params.id, body);
  }
}
