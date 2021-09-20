import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService{
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.usersService.findUser(email);
        if (users.length) {
            throw new BadRequestException('User already exist!')
        }

        // Hash ther user's password
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save the user
        const user = await this.usersService.create(email, hashedPassword);

        // Return the user
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.findUser(email);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        
        // return user;
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            throw new BadRequestException('Invalid Password');
        }
        return user;
    }
}