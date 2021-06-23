import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Study, StudyDocument, StudySchema } from "./schema/study.schema"
import { FilterQuery, Model, Date } from "mongoose";


@Injectable()
export class StudyService {
    constructor(@InjectModel(Study.name) private studyModel: Model<StudyDocument>) {}

    async createStudy(studyId: string, studyName: string, goalType: string, startDate:Date, endDate:Date): Promise<Study> {
        const newStudy = new this.studyModel({
            studyId,
            studyName,
            goalType,
            startDate,
            endDate
        })
        return newStudy.save()
    }

    async find(userFilterQuery? : FilterQuery<Study>): Promise<Study[]> {
        return this.studyModel.find(userFilterQuery)
    }
}
