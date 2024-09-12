import { UserDTO } from "../Entity/user.class";

export type TokenDTO = {
    accessToken: string,
    refresh: string,
}

export default interface Authentication {
    authenticate(user: UserDTO): Promise<TokenDTO>;
}