import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards';
import { ChangePasswordInputDto, CreateUserInputDto } from './dto';
import { CurrentUser } from '../../utils/decorators/user-payload.decorator';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation('createUser')
    async create(@Args('createUserInput') createUserInput: CreateUserInputDto) {
        return this.userService.create(createUserInput);
    }

    @Mutation('changePassword')
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @CurrentUser() user: any,
        @Args('changePasswordInput') changePasswordInput: ChangePasswordInputDto,
    ) {
        return this.userService.changePassword(user.sub, changePasswordInput);
    }

    @Mutation('initiateBalance')
    @UseGuards(JwtAuthGuard)
    async initiateBalance(@CurrentUser() user: any, @Args('amount') newBalance: number) {
        return this.userService.initiateBalance(user.sub, newBalance);
    }
}
