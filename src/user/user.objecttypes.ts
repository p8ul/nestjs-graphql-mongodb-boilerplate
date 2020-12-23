import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * User Object type
 */
@ObjectType()
export class UserObjectType {
  @Field(() => ID)
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;
  @Field()
  date: Date;
}

/**
 * Auth token object
 */
@ObjectType()
export class AuthToken {
  @Field()
  token: string;
}
