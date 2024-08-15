import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from '../users/users.module';
import { AuthGuard } from "../auth/guard/auth.guard";

@Module({
    imports: [UsersModule],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
})
export class AuthModule{}