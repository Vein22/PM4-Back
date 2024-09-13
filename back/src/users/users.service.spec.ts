import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';


describe('UsersService', () => {
    let service: UsersService;
    let userRepository: UsersRepository;
    
    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            UsersService,
            {
                provide: UsersRepository,
                useValue: {
                    findById: jest.fn(),
                    updatePassword: jest.fn(),
                },
            },
        ],
    }).compile()

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UsersRepository>(UsersRepository);
    });

    afterEach(() => {
        jest.clearAllMocks(); 
      });
    
      it('Should be defined', () => {
        expect(service).toBeDefined();
      });

      it('should change the password successfully when the current password is correct', async () => {
        const mockUser = {
          id: '1',
          password: 'hashedCurrentPassword',
          name: 'Test User',
          email: 'test@example.com',
          phone: 1234567890,
          country: 'Country',
          address: '123 Street',
          city: 'City',
          isAdmin: false,
          orders: []
        };
              
        const newPassword = 'newPassword';
        const hashedNewPassword = 'hashedNewPassword';
    
        jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); 
        jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedNewPassword);
        jest.spyOn(userRepository, 'updatePassword').mockResolvedValue(mockUser);
    
        const result = await service.changePassword('1', { currentPassword: 'currentPassword', newPassword });
    
        expect(result).toBe('Password changed successfully');
        expect(userRepository.findById).toHaveBeenCalledWith('1');
        expect(bcrypt.compare).toHaveBeenCalledWith('currentPassword', 'hashedCurrentPassword');
        expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
        expect(userRepository.updatePassword).toHaveBeenCalledWith('1', hashedNewPassword);
      });
})