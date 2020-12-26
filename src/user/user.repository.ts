import { UserEntity } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { createUserInput } from './types';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(authCredentails: createUserInput) {
    const { username, password, email } = authCredentails;
    const user = new UserEntity();
    user.password = password;
    user.username = username;
    user.email = email;
    user.save();
    return user;
  }
}
