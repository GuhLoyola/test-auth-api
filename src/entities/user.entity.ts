import { User } from "@prisma/client";

export class UserEntity implements User {
    UserId: number;
    Email: string;
    Password: string;

    token?: {
        access_token: string;
        refresh_token: string;
    }
}