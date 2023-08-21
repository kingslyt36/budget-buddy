import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateUserInput, UpdateUserInput } from './dto';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { hashPassword } from '../../util/helpers';

// TODO: Testing for mor error type
@Injectable()
export class UserService {
    constructor(private db: DatabaseService) {}

    async create(createUserInput: CreateUserInput): Promise<User> {
        try {
            // Create hashed password for extra security
            const hashedPassword = await hashPassword(createUserInput.password);

            const user = await this.db.user.create({
                data: {
                    username: createUserInput.username,
                    email: createUserInput.email,
                    password: hashedPassword,
                },
            });

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
        }
    }

    findAll() {
        return `This action returns all user`;
    }

    async findOneByEmail(email: string) {
        try {
            const user = await this.db.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new UnauthorizedException('Invalid email or password');
            }

            return user;
        } catch (error) {}
    }

    findOneById(id: number) {}

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
