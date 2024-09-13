import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Patch, Param, Body, NotFoundException, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "../auth/guard/auth.guard";
import { User } from "./entities/user.entity";
import { userInfo } from "os";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../auth/roles/roles.enum";
import { RolesGuard } from "../auth/guard/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger/dist";
import { ChangePasswordDto } from "./dto/changePassword.dto";

@Controller("users")
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    
    @ApiTags('Users')
    @HttpCode(200)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Get()
    async getUsers() {
      return this.usersService.getUsers();
    }

    @ApiTags('Users')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return await this.usersService.getUserById(id);
    }


    @ApiTags('Users')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Put(":id")
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.updateUserById(id, updateUserDto);
  }

    @ApiTags('Users')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
  
  @ApiTags('Users')
  @Patch(':id/change-password')
  async changePassword(@Param('id') id: string, @Body() ChangePasswordDto: ChangePasswordDto){
      return this.usersService.changePassword(id, ChangePasswordDto)
  }
} 

