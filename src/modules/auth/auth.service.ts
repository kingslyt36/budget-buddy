import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { UserService } from '../user/user.service';
import { comparePasswords } from '../../util/helpers';
import { RegisterInput } from '../../types/graphql';
import { AuthPayloadDto } from './dto';

// TODO: Implement JWT Token
@Injectable()
export class AuthService {
    constructor(
        private db: DatabaseService,
        private readonly userService: UserService,
    ) {}

    // TODO: Figure a way for GraphQL didn't have an option for query password out of user
    async login(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);

        if (!user || !(await comparePasswords(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const token = 'This will be generated later on';
        return {
            token,
            user,
        };
    }

    async register(registerInput: RegisterInput): Promise<AuthPayloadDto> {
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
            return {
                token,
                user,
            };
        } catch (error) {
            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
