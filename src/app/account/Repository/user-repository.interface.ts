import User from '../Entity/user.class';

export default interface UserRepository {
  createOne(user: User, password: string): Promise<boolean>;
  emailExist(email: string): Promise<boolean>;
}
