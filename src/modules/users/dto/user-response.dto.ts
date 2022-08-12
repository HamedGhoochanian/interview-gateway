import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({
    description: '24 character hex id',
    example: '7ba72775bf5cfd53bbeae9cb',
  })
  @Expose()
  _id: string;
  @ApiProperty({ example: 'Abbas Booazar' })
  @Expose()
  name: string;
  @ApiProperty({ example: 'abbas@gmail.com' })
  @Expose()
  email: string;
  @ApiProperty({ example: '2000-01-04' })
  @Expose()
  birthday: string;
  @ApiProperty({ example: '2022-01-04T00:00:00.000Z' })
  @Expose()
  createdAt: string;
}

export class UserListDto {
  @ApiProperty({ type: UserResponseDto, isArray: true })
  @Expose()
  @Type(() => UserResponseDto)
  data: UserResponseDto[];

  @ApiProperty()
  @Expose()
  count: number;
}
