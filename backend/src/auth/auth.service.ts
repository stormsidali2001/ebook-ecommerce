import { ForbiddenException, Injectable } from "@nestjs/common";
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
        console.log(user.email)
       const userDb = await this.userService.findUserByEmail(user.email);
       console.log('email : ',userDb)
       if(userDb){
        throw new ForbiddenException("email already taken.");
       }
       user.password = await this.hashPassword(user.password);
       return   await this.userService.create(user);
    }
}