import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  firstName: String,
  lastName: String,
});
