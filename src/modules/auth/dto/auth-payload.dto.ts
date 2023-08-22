import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from './user-data.dto';

export class AuthPayloadDto {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    user: UserDto;
}
