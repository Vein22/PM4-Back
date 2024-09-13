import { IsEmail, IsNotEmpty, IsString, MaxLength, IsOptional, MinLength, Matches, IsEmpty } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    currentPassword: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    newPassword: string;
}