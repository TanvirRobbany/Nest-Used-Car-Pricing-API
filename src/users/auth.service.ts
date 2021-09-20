import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
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
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '/' + hash.toString('hex');

        // Create a new user and save the user
        const user = this.usersService.create(email, result);

        // Return the user
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.findUser(email);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }

        const [salt, storedHash] = user.password.split('/');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid password');
        }
        
        return user;
    }
}