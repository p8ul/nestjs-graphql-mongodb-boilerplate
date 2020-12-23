import { Schema, Document } from 'mongoose';

/**
 * Mongoose User Schema
 */
export const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose User Document
 */
export interface IUser extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly date: Date;
}
