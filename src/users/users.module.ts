import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]), // User.name is the name of the function
    JwtModule.register({
      secret: "123456", // put this in env in the future,
      signOptions: {expiresIn: '1d'}

    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
