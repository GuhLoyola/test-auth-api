import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { UserDTO } from "src/dtos/user/user.dto";
import { Public } from "src/modules/core/decorators/public-auth.decorator";
import { UserService } from "src/modules/user/services/user.service";


@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ){ }

    @Public()
    @Post('register')
    async createUser(
        @Body() userDto: UserDTO
    ) {
        const user = await this.userService.createUser(userDto)

        return {
            Message: 'Added new User'
        }
    }
}


