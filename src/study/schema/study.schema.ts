import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type StudyDocument = Study & Document

@Schema()
export class Study {

    @Prop()
    @ApiProperty({required: true})
    studyId: string;

    @Prop()
    @ApiProperty({required: true})
    studyName: string;

    @Prop()
    @ApiProperty({required: true})
    goalType: string;

    @Prop({type: Date})
    @ApiProperty({required: true})
    startDate: Date;

    @Prop({type: Date})
    @ApiProperty({required: true})
    endDate: Date;

}

export const StudySchema = SchemaFactory.createForClass(Study);