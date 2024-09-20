import { Controller, Get } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";

@Controller()
export class DashboardController {

    constructor(
        private readonly userService: UserService
    ){}

    @Get('/dashboard')
    async Dashboard(email: string){

        const user = await this.userService.findOne(email)

        return {
            user,
            Message: "Dashboard acessado"
        }
    }

}