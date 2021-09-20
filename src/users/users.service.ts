import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User } from './user.entity';
import {User} from './schemas/user.schema'

@Injectable()
export class UsersService {
    // constructor(@InjectRepository(User) private repo: Repository<User>){}
    constructor(@InjectModel('Users') private repo: Model<User>) {}

    async create(email: string, password: string) {
        // const user = this.repo.create({email, password});

        // return this.repo.user.save();

        const newUser = new this.repo({
            email,
            password
        })

        const user = await newUser.save();
        return user;
    }

    // async findOne(id: number) {
    //     const user = await this.repo.findOne(id)

    //     if (!user) {
    //         throw new NotFoundException('User does not exist!')
    //     }

    //     return user;
    // }

    // findUser(email: string) {
    //     return this.repo.find({email})
    // }

    // findAll() {
    //     return this.repo.find({})
    // }

    // async update(id: number, attrs: Partial<User>) {
    //     const user = await this.findOne(id);

    //     if (!user) {
    //         throw new NotFoundException('User does not exist!');
    //     }

    //     Object.assign(user, attrs);

    //     // return this.repo.save(user);
    // }

    // async remove(id: number) {
    //     const user = await this.findOne(id);

    //     if (!user) {
    //         throw new NotFoundException('User does not exist!')
    //     }

    //     return this.repo.remove(user);
    // }
}
