import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserModule } from "./user/user.module";

@Module({
    imports: [ UserModule ]
})

export class HttpModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}