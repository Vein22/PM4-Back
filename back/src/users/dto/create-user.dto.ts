
import { IsEmail, IsNotEmpty, IsString, MaxLength, IsOptional, MinLength, Matches, IsEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
      message: 'Password too weak. The password needs to contain capital letters, a number and a symbol.',
    })
    password: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNotEmpty()
    phone: number;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    country: string;
  
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @IsEmpty()
    isAdmin: boolean;
  }