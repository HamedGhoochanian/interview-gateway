import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as path from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'user_package',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_URL,
          package: 'user',
          protoPath: path.join(__dirname, '../../proto/user.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
