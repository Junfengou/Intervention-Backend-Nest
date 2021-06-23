import { Date } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudyDto {
    @ApiProperty({required: true})
    studyId: string;

    @ApiProperty({required: true})
    studyName: string;

    @ApiProperty({required: true})
    goalType: string;

    @ApiProperty({required: true})
    startDate: Date;

    @ApiProperty({required: true})
    endDate: Date;
}