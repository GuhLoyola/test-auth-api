import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { CoreModule } from "src/modules/core/core.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "src/modules/user/services/user.service";
import { UserRepository } from "src/modules/user/repositories/user.repository";
import { AuthService } from "src/modules/user/services/auth.service";
import { DashboardController } from "./controllers/dashboard.controller";

@Module({
    imports: [ CoreModule ],
    controllers: [ AuthController, UserController, DashboardController ],
    providers: [ AuthService, UserService, UserRepository ]
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    }
}