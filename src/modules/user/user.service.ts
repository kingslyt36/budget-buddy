import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserInput, UpdateUserInput } from './dto';
import { DatabaseService } from '../database/database.service';
import { hashData } from '../../utils/helpers';
import { UserPayloadDto } from '../auth/dto';

// TODO: Testing for more error type
@Injectable()
export class UserService {
    constructor(private db: DatabaseService) {}

    async create(createUserInput: CreateUserInput): Promise<UserPayloadDto> {
        try {
            // Create hashed password for extra security
            const hashedPassword = await hashData(createUserInput.password);

            const user = await this.db.user.create({
                data: {
                    username: createUserInput.username,
                    email: createUserInput.email,
                    password: hashedPassword,
                },
            });

            delete user.password;
            return user;
        } catch (error) {
            throw error;
        }
    }

    findAll() {
        return `This action returns all user`;
    }

    async findOneByEmail(email: string): Promise<User> {
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
        } catch (error) {
            throw error;
        }
    }

    findOneById(id: number) {}

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
