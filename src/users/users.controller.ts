import { Controller, Body, Post } from '@nestjs/common';
import { CreateUseDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post('signup')
    createUser(@Body() body: CreateUseDto) {
        console.log(body);
    }
}
