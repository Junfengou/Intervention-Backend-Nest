import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({required: true})
    email: string;

    @ApiProperty({required: true})
    @MinLength(8)
    password: string;
}