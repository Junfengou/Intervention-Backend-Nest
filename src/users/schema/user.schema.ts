import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";



export type UserDocument = User & Document

@Schema()
export class User {

    @ApiProperty({required: true})
    @Prop()
    userId: string;

    @ApiProperty({required: true})
    @Prop()
    name: string;

    @ApiProperty({required: true})
    @Prop()
    email: string;

    @ApiProperty({required: true})
    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);