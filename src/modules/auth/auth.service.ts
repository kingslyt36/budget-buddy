import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseService } from '../database/database.service';
import { comparePasswords, hashPassword } from './helpers';

// TODO: Split the createUser and FindUserByName into UserService
@Injectable()
export class AuthService {
    constructor(private db: DatabaseService) {}

    async login(email: string, password: string): Promise<User> {
        const user = await this.db.user.findUnique({ where: { email } });
        if (!user || !(await comparePasswords(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }

    // TODO: Use DTO instead of GraphQL types
    async register(email: string, username: string, password: string): Promise<User> {
        try {
            // Create hashed password for extra security
            const hashedPassword = await hashPassword(password);
            // Save the new user to database
            const user = await this.db.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            // return the new user info
            // TODO: Need to be return the JWT token later when Passport-JWT strategy is implemented
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
