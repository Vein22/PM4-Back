import { Injectable, CanActivate, ExecutionContext, UnauthorizedException  } from "@nestjs/common"
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
       
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
          }

          const authHeaderParts = authHeader.split(' ');
          if (authHeaderParts.length !== 2 || authHeaderParts[0] !== 'Basic') {
            throw new UnauthorizedException('Invalid Authorization header format. Use <base64-encoded-email:password>');
          }
        
          const credentials = Buffer.from(authHeaderParts[1], 'base64').toString('utf-8').split(':');
          if (credentials.length !== 2) {
          throw new UnauthorizedException('Invalid Authorization header format. Use Basic <base64-encoded-email:password>');
          }

         const [email, password] = credentials;
         if (!email || !password) {
         throw new UnauthorizedException('Email or password is missing in authorization header');
         }

          return true;
     }
}