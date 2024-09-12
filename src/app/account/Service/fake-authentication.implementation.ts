import User, { UserDTO } from '../Entity/user.class';
import Authentication, { TokenDTO } from './authentication.interface';

export default class FakeAuthentication implements Authentication {
  authenticate(user: UserDTO): Promise<TokenDTO> {
    const tokenDTO: TokenDTO = {
      accessToken: 'fake-access-token',
      refresh: 'fake-refresh-token',
    };
    return Promise.resolve(tokenDTO);
  }
}
