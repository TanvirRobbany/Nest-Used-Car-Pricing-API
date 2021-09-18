import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateUseDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('signup')
    createUser(@Body() body: CreateUseDto) {
        this.usersService.create(body.email, body.password);
    }
}
