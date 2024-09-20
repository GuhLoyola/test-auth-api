import { IsEmail, IsNotEmpty } from "class-validator"

export class UserDTO {
    @IsNotEmpty({ message: "O campo 'Email' é obrigatório"})
    @IsEmail()
    email: string

    @IsNotEmpty({ message: "O campo 'Senha' é obrigatório"})
    password: string
}