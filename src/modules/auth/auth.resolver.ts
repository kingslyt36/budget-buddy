import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from 'src/types/graphql';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('login')
    login(@Args('loginInput') loginInput: LoginInput) {
        return this.authService.login(loginInput.email, loginInput.password);
    }

    @Mutation('register')
    async register(@Args('registerInput') registerInput: RegisterInput): Promise<User> {
        return this.authService.register(registerInput.email, registerInput.username, registerInput.password);
    }
}
