import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password: string) {
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    async findOne(id: number) {
        const user = await this.repo.findOne(id)

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

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User does not exist!');
        }

        Object.assign(user, attrs);

        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User does not exist!')
        }

        return this.repo.remove(user);
    }
}
