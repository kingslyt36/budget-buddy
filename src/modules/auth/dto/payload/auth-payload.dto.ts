import { IsNotEmpty } from 'class-validator';
import { UserPayloadDto } from './user-data.dto';
import { TokensPayload } from './tokens-payload.dto';

export class AuthPayloadDto {
    @IsNotEmpty()
    tokens: TokensPayload;

    @IsNotEmpty()
    user: UserPayloadDto;
}
