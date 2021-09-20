import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User } from './user.entity';
import {User} from './schemas/user.schema'
import { VirtualTimeScheduler } from 'rxjs';

@Injectable()
export class UsersService {
    // constructor(@InjectRepository(User) private repo: Repository<User>){}
    constructor(@InjectModel('Users') private repo: Model<User>) {}

    async create(email: string, password: string) {
        const newUser = new this.repo({
            email,
            password
        })

        const user = await newUser.save();
        return user;
    }

    async findOne(id: string) {
        const user = await this.repo.findById(id)

        if (!user) {
            throw new NotFoundException('User does not exist!')
        }

        return user;
    }

    findUser(email: string) {
        return this.repo.find({email})
    }

    findAll() {
        return this.repo.find({})
    }

    async update(id: string, attrs: Partial<User>) {
        const user = await this.repo.findById(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        let query = {_id: id};
        let newData = {
            email: attrs.email,
            password: attrs.password,
        }

        const updatedUser = await this.repo.findByIdAndUpdate(query, newData);
        return updatedUser;
    }

    async remove(id: string) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User does not exist!')
        }

        return this.repo.findByIdAndDelete(id);
    }
}
