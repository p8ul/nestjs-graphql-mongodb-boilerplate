import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { IUser } from './user.model';
import { AuthToken, UserObjectType } from './user.objecttypes';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  getHello() {
    return 'Hello World From Nestjs/GraphQL';
  }

  @Query(() => UserObjectType)
  async user(@Args('id') id: string): Promise<IUser> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [UserObjectType])
  async users(): Promise<IUser[]> {
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
