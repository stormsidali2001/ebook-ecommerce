import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { CreateUserDTO } from "src/core/dtos/user.dto";
import { UserDocument } from "../core/entities/user.schema";


@Injectable()
export class UserService{
    constructor(
         @InjectModel('User') private readonly userModel:Model<UserDocument>
    ){}
    
    async create(user:CreateUserDTO):Promise<UserDocument>{
        const newUser =  new this.userModel(user);
       return await newUser.save();
    }
    async findUserByEmail(email:string , includePassword:boolean = false ){
        return includePassword? await this.userModel.findOne({email}).exec()
                                :await this.userModel.findOne({email},{password:false}).exec();
    }
    async findUserById(_id:string , includePassword:boolean = false ){
        return includePassword? await this.userModel.findOne({_id}).exec()
                                :await this.userModel.findOne({_id},{password:false}).exec();
    }
    async findAndUpdate(filter: FilterQuery<UserDocument>,updateQuery:UpdateQuery<UserDocument>){
        return this.userModel.findOneAndUpdate(filter,updateQuery);
    }
    
    
}