import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MongoIdParamDto {
  @ApiProperty({
    description: '24 character hex id',
    example: '7ba72775bf5cfd53bbeae9cb',
  })
  @IsMongoId({ message: 'invalid id' })
  id: string;
}
