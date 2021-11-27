import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

   async createUser(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    async findUserByName(name: string):Promise<User |  undefined> {
        return await this.usersRepository
        .createQueryBuilder("user")
        .select("user.id")
        .addSelect("user.name")
        .where("user.name = :name", {name})
        .getOne();
    }

}
