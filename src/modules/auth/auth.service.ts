import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { DatabaseService } from '../database/database.service';
import { compareHashed, hashData } from '../../utils/helpers';
import { AuthPayloadDto, LoginInputDto, RegisterInputDto, UserPayloadDto } from './dto';
import { CustomErrorMessage } from '../../utils/const/errors/error-message';

// TODO: Implement JWT Token
@Injectable()
export class AuthService {
    constructor(
        private readonly config: ConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly db: DatabaseService,
    ) {}

    async login(LoginInputDto: LoginInputDto): Promise<AuthPayloadDto> {
        const user = await this.userService.findOneByEmail(LoginInputDto.email);

        if (!user || !(await compareHashed(LoginInputDto.password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }
        delete user.password;

        // Generate access token and refresh token for user
        const tokens = await this.generateToken(user);
        // Save the refresh token in to database
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

        // Return the user payload with access token
        return { tokens, user };
    }

    async register(registerInput: RegisterInputDto): Promise<AuthPayloadDto> {
        try {
            // Save the new user to database
            const user = await this.userService.create({
                email: registerInput.email,
                username: registerInput.username,
                password: registerInput.password,
            });
            delete user.password;

            // Generate access token and refresh token for user
            const tokens = await this.generateToken(user);
            // Save the refresh token in to database
            await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

            // Return the user payload with access token
            return { tokens, user };
        } catch (error) {
            // TODO: Specify which field is already taken
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(CustomErrorMessage.CREDENTIAL_TAKEN);
                }
            }

            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async logout(userId: string): Promise<void> {
        try {
            // Delete user hashed refresh token when logout
            await this.db.user.update({
                where: {
                    id: userId,
                    hashedRefreshToken: {
                        not: null,
                    },
                },
                data: {
                    hashedRefreshToken: null,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(userId: string, refreshToken: string) {
        // Find existing user
        const user = await this.db.user.findUnique({
            where: {
                id: userId,
                hashedRefreshToken: {
                    not: null,
                },
            },
        });
        // If user not exist, throw 401 exception
        if (!user) throw new ForbiddenException('Access Denied');

        delete user.password;

        const isRefreshTokenMatch = await compareHashed(refreshToken, user.hashedRefreshToken);
        if (!isRefreshTokenMatch) throw new ForbiddenException('Access Denied');

        const tokens = await this.generateToken(user);
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

        return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
    }

    // TODO: Evaluate access token and refresh token lifespan
    private async generateToken(userPayload: UserPayloadDto) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userPayload.id,
                    email: userPayload.email,
                },
                {
                    secret: this.config.get('JWT_SECRET'),
                    expiresIn: '1d',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userPayload.id,
                    email: userPayload.email,
                },
                {
                    secret: this.config.get('REFRESH_SECRET'),
                    expiresIn: '1d',
                },
            ),
        ]);

        return { accessToken, refreshToken };
    }

    private async updateRefreshTokenHash(userId: string, refreshToken: string) {
        // Hash the refresh token
        const hashedRefreshToken = await hashData(refreshToken);
        // Save it to the database
        await this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRefreshToken,
            },
        });
    }
}
