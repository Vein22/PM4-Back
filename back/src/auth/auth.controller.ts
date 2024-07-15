import { Controller, Get, HttpCode, Post, ValidationPipe, Body } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { SignInDto } from "src/users/dto/signin.dto";
import { SignUpDto } from "src/users/dto/signup.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController{
    constructor (private readonly authService: AuthService) {}

    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @Post('signup')
    async singUp(@Body() signUpUser: SignUpDto) {
      return this.authService.singUp(signUpUser);
    }

    @HttpCode(200)
    @Post('signin')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
      const { email, password } = signInDto;
      return this.authService.signIn(email, password);
    }
}