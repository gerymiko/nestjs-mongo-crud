import {
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './user.dto';
import { User as UserModel } from './user.model';
import { StatusCodes } from 'http-status-codes';
import { handleValidationError } from '../utils/validation-error.util';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    try {
      return await createdUser.save();
    } catch (error) {
      handleValidationError(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Get user by id
  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException('User not found', StatusCodes.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching user: ${error.message}`,
      );
    }
  }

  // Find user by username
  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  // Update user by id
  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      if (!updatedUser) {
        throw new HttpException('User not found', StatusCodes.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      handleValidationError(error);
      throw new InternalServerErrorException(
        `Error updating user: ${error.message}`,
      );
    }
  }

  // Delete user by id
  async remove(id: string): Promise<void> {
    try {
      const result = await this.userModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new HttpException('User not found', StatusCodes.NOT_FOUND);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting user: ${error.message}`,
      );
    }
  }
}
