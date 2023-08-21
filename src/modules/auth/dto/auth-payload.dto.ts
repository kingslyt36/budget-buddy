import { UserDto } from './user.dto';

export class AuthPayloadDto {
    token: string;
    user: UserDto;
}
