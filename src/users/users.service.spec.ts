import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './users.interface';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

class MockUserModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static create = jest.fn();
  static find = jest.fn();
  static findById = jest.fn();
  static findOne = jest.fn();
  static findByIdAndUpdate = jest.fn();
  static findByIdAndDelete = jest.fn();
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: MockUserModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      gender: 'male',
    };
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = { ...createUserDto, password: hashedPassword };

    const mockUserInstance = new MockUserModel(createdUser);
    jest.spyOn(mockUserInstance, 'save').mockResolvedValue(createdUser);
    jest
      .spyOn(MockUserModel, 'create')
      .mockImplementation(() => mockUserInstance);

    const result = await service.create(createUserDto);

    expect(result).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
      }),
    );
    expect(mockUserInstance.save).toHaveBeenCalled();
  });

  // it('should find all users', async () => {
  //   const users = [
  //     { name: 'John Doe', email: 'john@example.com', gender: 'male' },
  //   ];
  //   MockUserModel.find.mockResolvedValue(users);

  //   const result = await service.findAll();
  //   expect(result).toEqual(users);
  //   expect(MockUserModel.find).toHaveBeenCalled();
  // });

  // it('should find a user by id', async () => {
  //   const user = {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     gender: 'male',
  //   };
  //   MockUserModel.findById.mockResolvedValue(user);

  //   const result = await service.findOne('userId');
  //   expect(result).toEqual(user);
  //   expect(MockUserModel.findById).toHaveBeenCalledWith('userId');
  // });

  // it('should find a user by email', async () => {
  //   const user = {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     gender: 'male',
  //   };
  //   MockUserModel.findOne.mockResolvedValue(user);

  //   const result = await service.findByEmail('john@example.com');
  //   expect(result).toEqual(user);
  //   expect(MockUserModel.findOne).toHaveBeenCalledWith({
  //     email: 'john@example.com',
  //   });
  // });

  // it('should update a user by id', async () => {
  //   const updateUserDto = {
  //     name: 'John Doe Updated',
  //     email: 'john.updated@example.com',
  //     password: 'updatedPassword',
  //     gender: 'male',
  //   };
  //   const updatedUser = { ...updateUserDto, _id: 'userId' };

  //   MockUserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);
  //   const result = await service.update('userId', updateUserDto);

  //   expect(result).toEqual(updatedUser);
  //   expect(MockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
  //     'userId',
  //     updateUserDto,
  //     { new: true },
  //   );
  // });

  // it('should delete a user by id', async () => {
  //   MockUserModel.findByIdAndDelete.mockResolvedValue({ _id: 'userId' });

  //   await service.remove('userId');
  //   expect(MockUserModel.findByIdAndDelete).toHaveBeenCalledWith('userId');
  // });
});
