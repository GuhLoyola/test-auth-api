import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ApplicationException } from "src/modules/core/exceptions/application.exception";

import * as bcrypt from 'bcrypt'
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string) {
        try {
            const user = await this.userService.findOne(email)

            if(!user) {
                throw new ApplicationException(
                    HttpStatus.BAD_REQUEST,
                    '001',
                    'Invalid credentials. User login was not found.',
                    'As credenciais informadas estão inválidas.'
                )
            }

            const match = await bcrypt.compare(pass, user.Password);

            if (match) {
                const payload = { sub: user.UserId }

                return {
                    token: {
                        access_token: await this.jwtService.signAsync(payload)
                    }
                }
            } else {
                throw new ApplicationException(
                    HttpStatus.BAD_REQUEST,
                    '002',
                    'Invalid credentials. User password was incorrect.',
                    'As credenciais informadas estão inválidas.'
                )
            }

        } catch (error) {
            throw error
        }
    }

}