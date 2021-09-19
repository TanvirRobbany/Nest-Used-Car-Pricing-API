import { Controller, Body, Post, Get, Patch, Delete, Param, Query, UseInterceptors } from '@nestjs/common';
import { CreateUseDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('signup')
    createUser(@Body() body: CreateUseDto) {
        this.usersService.create(body.email, body.password);
    }

    @UseInterceptors(new SerializeInterceptor(UserDto))
    @Get(':id')
    findUser(@Param('id') id: string) {
        // console.log('Handler is running...')
        return this.usersService.findOne(parseInt(id));
    }

    // @Get()
    // findAllUsers(@Query('email') email: string) {
    //     return this.usersService.find(email);
    // }

    @Get()
    findAllUsers() {
        return this.usersService.find();
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }
}
