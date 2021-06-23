import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({required: true})
    userId: string;

    @ApiProperty({required: true})
    @MaxLength(15) // just for testing, no reason name should cap at 15 characters lol
    name: string;

    @ApiProperty({required: true})
    email: string;

    @ApiProperty({required: true})
    @MinLength(8)
    password: string;
}