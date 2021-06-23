import { Module } from '@nestjs/common';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';
import { MongooseModule } from "@nestjs/mongoose"
import { Study, StudySchema } from "./schema/study.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Study.name, schema: StudySchema}])
  ],
  controllers: [StudyController],
  providers: [StudyService]
})
export class StudyModule {}
