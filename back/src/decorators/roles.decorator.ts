import { SetMetadata } from "@nestjs/common";
import { Role } from "src/auth/roles/roles.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)
