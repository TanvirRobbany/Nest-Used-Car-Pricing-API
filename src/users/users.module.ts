import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
// import { User } from './user.entity';
import { UserSchema } from './schemas/user.schema';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [MongooseModule.forFeature([{name: 'Users', schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, {provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor}]
})
export class UsersModule { }
