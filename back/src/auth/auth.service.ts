import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    getAuth() {
        return "Get auth.";
    } 

    
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Sign in successful', userId: user.id };
  }
}