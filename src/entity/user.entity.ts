import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseAppEntity } from './base.entity';

@Entity()
@ObjectType()
export class UserEntity extends BaseAppEntity {
  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  @Field()
  verified: boolean;

  @Column({ type: Date, nullable: true })
  @Field()
  lastLogin: Date | null;
}

@ObjectType()
export class AuthToken {
  @Field()
  token: string;
}
