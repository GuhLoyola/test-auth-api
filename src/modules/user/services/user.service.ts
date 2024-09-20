import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";
import { UserDTO } from "src/dtos/user/user.dto";

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService{

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async findOne(email: string): Promise<User | undefined> {

        const user = await this.userRepository.findUser(email)


        return user
    }


    async createUser(userDto: UserDTO) {
        if(userDto.email === '' || userDto.password === '') {
            throw new BadRequestException({
                Message: 'Both email and password are needed'
            })
        }

        const existingUser = await this.userRepository.findUser(userDto.email)

        if(existingUser) {
            throw new BadRequestException({
                Message: 'Email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 10);

        const user = await this.userRepository.createUser(userDto.email, hashedPassword)

        return {
            hashedPassword
        }
    }

}