import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService{
    constructor(private readonly usersRepository: UsersRepository) {}

    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findByEmail(email);
      }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.getUsers();
    }

     getUserById(id: string): Promise<User>  {
        return this.usersRepository.getUserById(id);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.createUser(createUserDto);
      }

    async updateUserById(id: string, updateUserDto: UpdateUserDto) {
        return this.usersRepository.updateUserById(id, updateUserDto);
    }

    
    async deleteUserById(id: string): Promise<{id:string}>  {
        return this.usersRepository.deleteUserById(id);
    }
}
