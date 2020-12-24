import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { IToken, RegisterPayload } from './types';
import { UserEntity } from 'src/database/entity/user.entity';

@Injectable()
export class UserService {
  /**
   * Constructor
   * @param {Model<IUser>} userModel
   */
  private jwtService = new JwtService({ secret: 'hard!to-guess_secret' });
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
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
  async create(payload: RegisterPayload): Promise<UserEntity> {
    const user = this.userModel.create({
      ...payload,
      password: createHmac('sha256', payload.password).digest('hex'),
    });
    this.userModel.save(user);
    return user;
  }

  /**
   * create jwt token based on user payload
   * @param {User} param user payload to generate token
   * @returns {Promise<IToken>} token body
   */
  async createToken({ _id, username, email }: UserEntity): Promise<IToken> {
    return {
      token: this.jwtService.sign({ _id, username, email }),
    };
  }
}
