import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { v4 as uuidv4 } from 'uuid';
import { FilterQuery, Model } from "mongoose";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async register(email: string, password: string, name: string): Promise<User> {

        // hash password with salt bae's salt
        const hashedPassword = await bcrypt.hash(password, 12);

        // storing user information in this format and hash the password
        const newUser =  new this.userModel({
            userId: uuidv4(),
            email,
            password: hashedPassword,
            name
        });
        return newUser.save();
    }

    async find(userFilterQuery?: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(userFilterQuery)
    }

    async findOne(condition: any): Promise<User> {
        return this.userModel.findOne(condition)
    }
}
