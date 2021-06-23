import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';


@ApiTags('users') // section off everything in swagger ui
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}



  @Post('register')
  @ApiOkResponse({type: User, description: "Register an user"}) // when the request goes through
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse() // it's possible to get bad request back

  async register(@Body() CreateUserDto: CreateUserDto):Promise<User> {
    // const hashedPassword = await bcrypt.hash(CreateUserDto.password, 12);

      return this.usersService.register(CreateUserDto.email, CreateUserDto.password, CreateUserDto.name);
  }

  @Get()
  @ApiOkResponse({type: User, isArray: true, description: "Return a list of users"})

  async getUsers(): Promise<User[]> {
    return this.usersService.find({})
  }

  
  @Get('user')
  @ApiOkResponse({type: User})
  async user(@Req() request: Request) {
    try{
        // verify user's cookie
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      

      if(!data) {
        throw new UnauthorizedException()
      }

      // query user
      const user = await this.usersService.findOne({userId: data['id']});

      return user;

    }
    catch(e) {
      throw new UnauthorizedException()
    }

  }


  // check to see if the user exist
  // @Get(':userId')
  // async login(@Param('userId') userId: string):Promise<User> {
  //   return this.usersService.findOne(userId)
  // }

  // This needs to be a post request because the user login form takes in email and password
  @Post('login')
  @ApiOkResponse({type: User, description: "Check if user is currently logged in"}) // when the request goes through
  //async login(@Body() CreateUserDto: CreateUserDto):Promise<User>
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response) {
    const user = await this.usersService.findOne({email})

    // check if the user email exist
    if(!user) {
      throw new BadRequestException('Invalid Email')
    }

    // check if the password matches
    if(!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('Invalid Password')
    } 

    // generate the jwt token for sign in and it will expire in a day
    const jwt = await this.jwtService.signAsync({id: user.userId})

    response.cookie('jwt', jwt, {httpOnly: true});

    // return jwt for sanity test lol
    return {
      message: "successfully logged in"
    }
  }

  @Post('logout')
  @ApiOkResponse({type: User, description: "Log user out"})

  async logout(@Res({passthrough: true}) response: Response){
      response.clearCookie('jwt');
      return {
        message: "successfully cleared jwt"
      }
  }

}
