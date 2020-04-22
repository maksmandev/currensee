import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: UserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ id: user.id }, user, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
