import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserDTO } from "src/dtos/user/user.dto";
import { Public } from "src/modules/core/decorators/public-auth.decorator";
import { AuthService } from "src/modules/user/services/auth.service";

@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const user = this.authService.signIn(email, password);

        return user
    }

}