import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { SignUpDto } from "../users/dto/signup.dto";
import { User } from "../users/entities/user.entity";
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from "../users/dto/response.user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService,
      ) {}

    getAuth() {
        return "Get auth.";
    } 

  async signUp( signUpUser: SignUpDto) {
    const dbUser = await this.usersService.findByEmail(signUpUser.email)
    if(dbUser) {
      throw new BadRequestException('Email already exist')
    }

    if (signUpUser.password !== signUpUser.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPasword = await bcrypt.hash(signUpUser.password, 10);
    if(!hashedPasword) {
      throw new BadRequestException('Password could not be hashed')
    }
      this.usersService.createUser({...signUpUser, password: hashedPasword})
      return new UserResponseDto(signUpUser)

      

  }
    
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compare( password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const payload = {
          sub: user.id,
          id: user.id,
          email: user.email,
        };
    
      const token = this.jwtService.sign(payload);


    return { success: 'Sign in successfully', token};
  }
}