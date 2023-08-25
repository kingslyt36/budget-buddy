import { IsNotEmpty, IsNumber } from 'class-validator';
import { AuthPayloadDto } from '../payload/auth-payload.dto';

export class RegisterResponseDto {
    @IsNumber()
    @IsNotEmpty()
    status: number;

    @IsNotEmpty()
    data: AuthPayloadDto;
}
