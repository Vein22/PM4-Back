import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { SignUpDto } from "../users/dto/signup.dto";
import { UserResponseDto } from "../users/dto/response.user.dto";
import { UnauthorizedException } from "@nestjs/common";

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: Partial<UsersService>;
    let jwtService: JwtService;
  
    beforeEach(async () => {
      const mockUsersService: Partial<UsersService> = {
        findByEmail: jest.fn(),
        createUser: jest.fn(),
      };
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: UsersService, useValue: mockUsersService },
          JwtService,
        ],
      }).compile();
  
      authService = module.get<AuthService>(AuthService);
      usersService = module.get<UsersService>(UsersService);
      jwtService = module.get<JwtService>(JwtService);
    });
  
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
  
    describe('signUp', () => {
      it('should create a new user', async () => {
        const signUpDto: SignUpDto = {
          name: 'John Doe',
          email: 'test@example.com',
          password: 'Password123!',
          confirmPassword: 'Password123!',
          address: '123 Main St',
          phone: 1234567890,
          country: 'Country',
          city: 'City',
          isAdmin: false
        };
  
        const user: Omit<User, 'orders'> = {
          ...signUpDto,
          id: '1',
          password: await bcrypt.hash(signUpDto.password, 10),
        };
  
        (usersService.createUser as jest.Mock).mockResolvedValue(user);
  
        const result = await authService.signUp(signUpDto as SignUpDto);
        expect(result).toBeDefined();
        expect(result).toEqual(new UserResponseDto(user));
     });
    });
  
    describe('signIn', () => {
      it('should sign in a user and return a token', async () => {
        const email = 'test@example.com';
        const password = 'Password123!';
  
        const user: Omit<User, 'orders'> = {
          id: '1',
          name: 'John Doe',
          email,
          password: await bcrypt.hash(password, 10),
          address: '123 Main St',
          phone: 1234567890,
          country: 'Country',
          city: 'City',
          isAdmin: false
        };
  
        (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
        const token = 'jwt-token';
        jest.spyOn(jwtService, 'sign').mockImplementation(() => token);
  
        const result = await authService.signIn(email, password);
        expect(result).toBeDefined();
        expect(result.token).toEqual(token);
      });
  
      it('should throw an error if credentials are invalid', async () => {
        const email = 'test@example.com';
        const password = 'WrongPassword';
  
        (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
  
        await expect(authService.signIn(email, password)).rejects.toThrow(UnauthorizedException);
      });
    });
  });