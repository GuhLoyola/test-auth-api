import { UserEntity } from "src/entities/user.entity";

export interface IUserRepository {
    findUser: (email: string) => Promise<UserEntity | null>
}