import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { createUserInput } from './types';
import { AuthToken, UserEntity } from 'src/entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  /**
   * Constructor
   * @param {Model<IUser>} userModel
   */
  // private jwtService = new JwtService({ secret: 'hard!to-guess_secret' });
  constructor(
    @InjectRepository(UserRepository)
    private readonly userModel: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Fetch a user from database by id
   * @param {string} id
   * @returns {Promise<IUser>}
   */
  get(id: string): Promise<UserEntity> {
    return this.userModel.findOne({ _id: id });
  }

  /**
   * Fetch a user by password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<IUser>}
   */
  getUserByPassword(username: string, password: string): Promise<UserEntity> {
    return this.userModel.findOne({
      username,
      password: createHmac('sha256', password).digest('hex'),
    });
  }

  /**
   * Fetch user by id
   * @param {string} id user id
   */
  getUserById(id: string): Promise<UserEntity> {
    return this.userModel.findOne({ _id: id });
  }

  /**
   * Fetch all users
   * @param payload
   */
  getUsers(): Promise<UserEntity[]> {
    return this.userModel.find();
  }

  /**
   * Create a user with registerPayload fields
   * @param {RegisterPayload} payload user payload
   * @returns {Promise<IUser>} created user
   */
  async create(payload: createUserInput): Promise<UserEntity> {
    const user = this.userModel.signUp({
      ...payload,
      password: createHmac('sha256', payload.password).digest('hex'),
    });
    return user;
  }

  /**
   * create jwt token based on user payload
   * @param {User} param user payload to generate token
   * @returns {Promise<IToken>} token body
   */
  async createToken({ _id, username, email }: UserEntity): Promise<AuthToken> {
    return {
      token: this.jwtService.sign(
        { _id, username, email },
        { expiresIn: '10h' },
      ),
    };
  }

  /**
   * verity jwt token based on user payload
   * @param {token} jwt token
   * @returns {Promise<boolean>} true if valid else false
   */
  async verifyToken(token: string): Promise<boolean> {
    const res = await this.jwtService.verify(token);
    const user = this.getUserById(res._id);
    if (!user) {
      return false;
    }
    return true;
  }
}
