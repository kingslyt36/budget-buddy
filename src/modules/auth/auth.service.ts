import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { UserService } from '../user/user.service';
import { comparePasswords } from '../../util/helpers';
import { AuthPayloadDto, LoginInputDto, RegisterInputDto } from './dto';
import { CustomErrorMessage } from '../../util/const/errors/error-message';

// TODO: Implement JWT Token
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    // TODO: Figure a way for GraphQL didn't have an option for query password out of user
    async login(LoginInputDto: LoginInputDto) {
        try {
            const user = await this.userService.findOneByEmail(LoginInputDto.email);

            if (!user || !(await comparePasswords(LoginInputDto.password, user.password))) {
                throw new UnauthorizedException('Invalid email or password');
            }

            const token = 'This will be generated later on';
            return { token, user };
        } catch (error) {
            throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async register(registerInput: RegisterInputDto): Promise<AuthPayloadDto> {
        try {
            // Save the new user to database
            const user = await this.userService.create({
                email: registerInput.email,
                username: registerInput.username,
                password: registerInput.password,
            });

            // return the new user info
            // TODO: Need to be return the JWT token later when Passport-JWT strategy is implemented
            const token = 'This will be generated later on';
            return { token, user };
        } catch (error) {
            console.log(error);

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(CustomErrorMessage.CREDENTIAL_TAKEN);
                }
            }

            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
