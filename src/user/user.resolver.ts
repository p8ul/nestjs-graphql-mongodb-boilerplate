import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Permission } from 'src/common/global-types';
import { Allow } from 'src/decorators/allow.decorator';
import { AuthToken, UserEntity } from 'src/entity/user.entity';
import { createUserInput } from './types';
import { UserService } from './user.service';

@Resolver('User')
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
  @Allow(Permission.Public)
  async createUser(@Args('createUserInput') createUserInput: createUserInput) {
    const user = await this.userService.create(createUserInput);
    const token = this.userService.createToken(user);
    return token;
  }

  @Mutation(() => AuthToken)
  @Allow(Permission.Public)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.getUserByPassword(username, password);
    if (!user) {
      throw new NotFoundException();
    }
    const token = this.userService.createToken(user);
    return token;
  }
}
