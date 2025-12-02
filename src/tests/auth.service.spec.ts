import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: { findByEmail: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn().mockReturnValue('token') } },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('login should return access_token', async () => {
    const token = await authService.login({ id: '1', email: 'a@test.com', role: 'user' });
    expect(token).toEqual({ access_token: 'token' });
  });
});
