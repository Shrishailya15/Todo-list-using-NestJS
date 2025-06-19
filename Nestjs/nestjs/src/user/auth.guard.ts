import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  import { config } from 'src/constants';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const request = context.switchToHttp().getRequest();
  
      // read the token from header
      const token = this.extractTokenFromHeader(request);
      if (token == undefined) {
        throw new HttpException('Token not found', 401);
      }
  
      // get the payload from the token
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const payload = this.jwtService.verify(token, { secret: config.secret });
  
        // embed the payload in the request object
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        request['user'] = payload;
  
        return true;
      } catch (ex) {
        console.log(ex);
        throw new HttpException('Invalid token', 401);
      }
  
      return false;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return type === 'Bearer' ? token : undefined;
    }
  }
  