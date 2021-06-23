import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateStudyDto } from './dto/create-study.dto';
import { StudyService } from './study.service';
import { Study } from "./schema/study.schema"

@ApiTags('study') // section off everything in swagger ui
@Controller('study')
export class StudyController {
    constructor( private readonly studyService: StudyService) {}

    @Post('create')
    @ApiOkResponse({type: Study, description: "Create a study"}) 
    @ApiCreatedResponse({ type: Study })
    @ApiBadRequestResponse()
    async create(@Body() createStudyDto: CreateStudyDto): Promise<Study> {
        const {studyId, studyName, goalType, startDate, endDate} = createStudyDto;
        return this.studyService.createStudy(studyId, studyName, goalType, startDate, endDate)
    }

    @Get()
    @ApiOkResponse({type: Study, isArray: true, description: "Return a list of studies"})
    async getAllStudies(): Promise<Study[]> {
        return this.studyService.find({})
    }
}
