import { Controller, Body, Post, Get, Patch, Delete, Param, Query, UseInterceptors, Session } from '@nestjs/common';
import { CreateUseDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@UseInterceptors(new SerializeInterceptor(UserDto))
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Post('signup')
    async createUser(@Body() body: CreateUseDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('signin')
    async signin(@Body() body: CreateUseDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('whoami')
    whoAmI(@Session() session: any){
        return this.usersService.findOne(session.userId);
    }

    @Post('signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Get(':id')
    findUser(@Param('id') id: string) {
        // console.log('Handler is running...')
        return this.usersService.findOne(id);
    }

    @Get()
    findUsers(@Query('email') email: string) {
        return this.usersService.findUser(email);
    }

    @Get()
    findAllUsers() {
        return this.usersService.findAll();
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(id, body);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
