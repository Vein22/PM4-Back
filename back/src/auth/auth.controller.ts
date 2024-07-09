import { Controller, Get, HttpCode, Post, ValidationPipe, Body } from "@nestjs/common";
import { SignInDto } from "src/users/dto/signin.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController{
    constructor (private readonly authService: AuthService) {}

    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @HttpCode(200)
    @Post('signin')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
      const { email, password } = signInDto;
      return this.authService.signIn(email, password);
    }
}