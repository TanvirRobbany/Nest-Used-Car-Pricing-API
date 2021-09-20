import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserSchema } from './schemas/user.schema';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [MongooseModule.forFeature([{name: 'Users', schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule { }
