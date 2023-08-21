import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation('createUser')
    async create(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @Query('getUsers')
    findAll() {
        return this.userService.findAll();
    }

    @Query('getUserById')
    findOneById(@Args('id') id: number) {
        return this.userService.findOneById(id);
    }

    @Query('getUserByEmail')
    findOneByEmail(@Args('email') email: string) {
        return this.userService.findOneByEmail(email);
    }

    @Mutation('updateUser')
    update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput.id, updateUserInput);
    }

    @Mutation('removeUser')
    remove(@Args('id') id: number) {
        return this.userService.remove(id);
    }
}
