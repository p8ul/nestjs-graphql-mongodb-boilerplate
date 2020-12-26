import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class createUserInput {
  @IsEmail()
  @Field()
  email: string;
  @IsString()
  @MinLength(3)
  @Field()
  username: string;
  @MinLength(4)
  @IsString()
  @Field()
  password: string;
}
