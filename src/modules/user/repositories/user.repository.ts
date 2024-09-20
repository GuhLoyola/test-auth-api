import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/core/prisma.service";
import { IUserRepository } from "../interfaces/repositories/iuser.repository";

@Injectable()
export class UserRepository implements IUserRepository{

    constructor( private prisma: PrismaService ) { }

    async findUser(email: string) {
        const user = await  this.prisma.user.findFirst({
            where:{
                Email: email
            }
        })

        return user
   }

    async createUser(email: string, password: string) {
        return this.prisma.user.create({
            data: {
                Email: email,
                Password: password
            }
        });
    }

}