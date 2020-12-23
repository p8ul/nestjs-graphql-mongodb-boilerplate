import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { IUser } from './user.model';
import { IToken, RegisterPayload } from './types';

@Injectable()
export class UserService {
  /**
   * Constructor
   * @param {Model<IUser>} userModel
   */
  private jwtService = new JwtService({ secret: 'hard!to-guess_secret' });
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  /**
   * Fetch a user from database by id
   * @param {string} id
   * @returns {Promise<IUser>}
   */
  get(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Fetch a user by password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<IUser>}
   */
  getUserByPassword(username: string, password: string): Promise<IUser> {
    return this.userModel
      .findOne({
        username,
        password: createHmac('sha256', password).digest('hex'),
      })
      .exec();
  }

  /**
   * Fetch user by id
   * @param {string} id user id
   */
  getUserById(id: string): Promise<IUser> {
    return this.userModel.findById({ id }).exec();
  }

  /**
   * Fetch all users
   * @param payload
   */
  getUsers(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  /**
   * Create a user with registerPayload fields
   * @param {RegisterPayload} payload user payload
   * @returns {Promise<IUser>} created user
   */
  async create(payload: RegisterPayload): Promise<IUser> {
    const user = new this.userModel({
      ...payload,
      password: createHmac('sha256', payload.password).digest('hex'),
    });
    return user.save();
  }

  /**
   * create jwt token based on user payload
   * @param {User} param user payload to generate token
   * @returns {Promise<IToken>} token body
   */
  async createToken({ _id, username, email }: IUser): Promise<IToken> {
    return {
      token: this.jwtService.sign({ _id, username, email }),
    };
  }
}
