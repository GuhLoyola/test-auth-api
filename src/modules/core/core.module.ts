import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "./prisma.service";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        })
    ],
    providers: [ PrismaService ],
    exports: [JwtModule, PrismaService]
})

export class CoreModule { }