import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose"
import { UsersModule } from './users/users.module';
import { StudyModule } from './study/study.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Junfengou:10prestige@nestauth.itpzx.mongodb.net/test'), UsersModule, StudyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
