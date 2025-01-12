import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn().mockImplementation((email: string) => {
      return {
        _id: 'userId',
        email,
        password: bcrypt.hashSync('password', 10),
      };
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockImplementation(() => 'signed-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user', async () => {
    const user = await service.validateUser('username', 'password');
    expect(user).toBeDefined();
    expect(user.username).toEqual('username');
  });

  it('should return null for invalid user', async () => {
    const user = await service.validateUser('username', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('should return a JWT token', async () => {
    const token = await service.login({
      email: 'test@example.com',
      _id: 'userId',
    });
    expect(token.access_token).toEqual('signed-jwt-token');
  });
});
