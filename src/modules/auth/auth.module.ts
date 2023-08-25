import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';

@Module({
    imports: [JwtModule.register({})],
    providers: [AuthResolver, AuthService, UserService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
