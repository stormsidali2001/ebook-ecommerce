import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from "../core/dtos/user.dto";
import { UserService } from "../user/user.service";
@Injectable()
export class AuthService{
    constructor(
        private userService:UserService
    ){}
    async hashPassword(password:string):Promise<string>{
        return   bcrypt.hash(password,12);
    }
    async comparePassword(password:string,passwordDb:string):Promise<boolean>{
        return bcrypt.compare(password,passwordDb);
    }
    async register(user:CreateUserDTO){
       user.password = await this.hashPassword(user.password);
       return   this.userService.create(user);
    }
}