import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO } from "src/core/dtos/user.dto";
import { UserDocument } from "../core/entities/user.schema";


@Injectable()
export class UserService{
    constructor(
         @InjectModel('User') private readonly userModel:Model<UserDocument>
    ){}
    
    async create(user:CreateUserDTO):Promise<UserDocument>{
        console.log(user)
        const newUser = new this.userModel(user);
        return  newUser.save();
    }
    
    
    
}