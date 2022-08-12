import {
  IsDateString,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    example: 'Abbas Booazar',
    description: "user's name, between 4 & 40 characters",
  })
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  readonly name: string;
  @ApiProperty({ example: 'abbas@gmail.com' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ description: 'an ISO8061 date string', example: '2000-04-01' })
  @IsDateString()
  readonly birthday: string;
}
