import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, NotFoundException, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/auth/guard/Auth.Guard";
import { User } from "./entities/user.entity";
import { userInfo } from "os";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/roles/roles.enum";
import { RolesGuard } from "src/auth/guard/roles.guard";

@Controller("users")
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    
    @HttpCode(200)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getUsers() {
      return this.usersService.getUsers();
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return await this.usersService.getUserById(id);
    }


    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Put(":id")
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.updateUserById(id, updateUserDto);
  }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
} 

