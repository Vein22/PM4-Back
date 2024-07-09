import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
          where: { email },
          select: ['id', 'name', 'email', 'password', 'phone', 'country', 'address', 'city', 'orders'],
        });
      }

   async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['orders'],
      select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'], 
    });
  }

     async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
        where: { id },
        relations: ['orders'],
        select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'], 
      });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
      }

        
      async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return this.getUserById(id);
      }

      async deleteUserById(id: string): Promise<{id:string}> {
        await this.userRepository.delete(id);
        return { id };
      }
}