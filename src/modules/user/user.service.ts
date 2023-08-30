import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { ChangePasswordInputDto, CreateUserInputDto, UserResponseDto } from './dto';
import { DatabaseService } from '../database/database.service';
import { compareHashed, hashData } from '../../utils/helpers';

@Injectable()
export class UserService {
    constructor(private db: DatabaseService) {}

    async create(createUserInput: CreateUserInputDto): Promise<User> {
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

            return user;
        } catch (error) {
            throw error;
        }
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

    async changePassword(userId, userPasswordData: ChangePasswordInputDto): Promise<UserResponseDto> {
        try {
            const user = await this.db.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new BadRequestException('No user were found');
            }

            const isPasswordCorrect = await compareHashed(userPasswordData.oldPassword, user.password);
            if (!isPasswordCorrect) {
                throw new BadRequestException('Invalid old password');
            }

            const newHashedPassword = await hashData(userPasswordData.oldPassword);
            const userWithNewPassword = await this.db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    password: newHashedPassword,
                },
            });

            const response: UserResponseDto = {
                status: HttpStatus.ACCEPTED,
                data: userWithNewPassword,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    async initiateBalance(userId: string, newBalance: number) {
        try {
            const updatedUser = await this.db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    balance: newBalance,
                },
            });

            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
}
