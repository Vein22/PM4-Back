import { Controller, Get, HttpCode, Post, ValidationPipe, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { SignInDto } from "../users/dto/signin.dto";
import { SignUpDto } from "../users/dto/signup.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController{
    constructor (private readonly authService: AuthService) {}

    @ApiTags('Auth')
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @ApiTags('Auth')
    @Post('signup')
    async signUp(@Body() signUpUser: SignUpDto) {
      return this.authService.signUp(signUpUser);
    }

    @ApiTags('Auth')
    @HttpCode(200)
    @Post('signin')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
      const { email, password } = signInDto;
      return this.authService.signIn(email, password);
    }
}