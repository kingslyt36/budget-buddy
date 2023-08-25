import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
    RegisterInputDto,
    LoginInputDto,
    LogoutResponseDto,
    RegisterResponseDto,
    LoginResponseDto,
    TokensPayload,
} from './dto';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './guards';
import { CurrentUser } from 'src/utils/decorators/user-payload.decorator';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('register')
    async register(@Args('registerInput') registerInput: RegisterInputDto): Promise<RegisterResponseDto> {
        const data = await this.authService.register(registerInput);
        const registerResponse = {
            status: HttpStatus.CREATED,
            data,
        };

        return registerResponse;
    }

    @Mutation('login')
    async login(@Args('loginInput') loginInput: LoginInputDto): Promise<LoginResponseDto> {
        const data = await this.authService.login(loginInput);
        const loginResponse = {
            status: HttpStatus.OK,
            data,
        };

        return loginResponse;
    }

    @Mutation('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@CurrentUser() user: any): Promise<LogoutResponseDto> {
        try {
            await this.authService.logout(user.sub);
            const logoutResponse = {
                status: HttpStatus.OK,
                message: 'User logout successfully',
            };

            return logoutResponse;
        } catch (error) {
            throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Mutation('refreshToken')
    @UseGuards(JwtRefreshAuthGuard)
    async refreshToken(@CurrentUser() user: any): Promise<TokensPayload> {
        try {
            return this.authService.refreshToken(user.sub, user.refreshToken);
        } catch (error) {
            throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
