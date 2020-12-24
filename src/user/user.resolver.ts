import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthToken, UserEntity } from 'src/database/entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  getHello() {
    return 'Hello World From Nestjs/GraphQL';
  }

  @Query(() => UserEntity)
  async user(@Args('id') id: string): Promise<UserEntity> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [UserEntity])
  async users(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Mutation(() => AuthToken)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('username') username: string,
  ) {
    const user = await this.userService.create({ email, username, password });
    const token = this.userService.createToken(user);
    return token;
  }

  @Mutation(() => AuthToken)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.getUserByPassword(username, password);
    const token = this.userService.createToken(user);
    return token;
  }
}
