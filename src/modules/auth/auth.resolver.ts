import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthPayloadDto, RegisterInputDto, LoginInputDto } from './dto';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('login')
    login(@Args('loginInput') loginInput: LoginInputDto) {
        return this.authService.login(loginInput);
    }

    @Mutation('register')
    async register(@Args('registerInput') registerInput: RegisterInputDto): Promise<AuthPayloadDto> {
        return this.authService.register(registerInput);
    }
}
