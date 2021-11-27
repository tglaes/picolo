import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post('/register')
    async registerUser(@Body() registerUserDto: RegisterUserDto ): Promise<User>{
        
        if (!(await this.doesUserExistByName(registerUserDto.name)))
        {
            const user = new User();
            Object.assign(user, registerUserDto);
            return this.userService.createUser(user);
        }
        throw new BadRequestException('User with name ('+ registerUserDto.name + ') is already registered');
    }

    private async doesUserExistByName(name: string): Promise<boolean> {
        return await this.userService.findUserByName(name) !== undefined 
    }

}
