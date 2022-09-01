import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ObjectId } from "mongoose";
import { CreateUserDTO, LoginDTO } from "../core/dtos/user.dto";
import { UserService } from "../user/user.service";
import { jwtPayload, tokens } from "./types/tokens.interface";
import * as argon2 from 'argon2';
@Injectable()
export class AuthService{
    constructor(
        private userService:UserService,
        private jwtService:JwtService,
        private configService:ConfigService
    ){}
    async hashPassword(password:string):Promise<string>{
        return   bcrypt.hash(password,12);
    }
    async comparePassword(password:string,passwordDb:string):Promise<boolean>{
        return bcrypt.compare(password,passwordDb);
    }
    async generateTokens(jwtPayload:jwtPayload):Promise<tokens>{
            const [access_token,refresh_token] = await Promise.all([
                this.jwtService.signAsync(
                    jwtPayload,
                    {
                        secret:this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
                        expiresIn:this.configService.get('JWT_ACCESS_TOKEN_EXPIRESIN')
                    }
                    ),
                this.jwtService.signAsync(
                    jwtPayload,
                    {
                            secret:this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
                            expiresIn:this.configService.get('JWT_ACCESS_TOKEN_EXPIRESIN')
                    }
                    )
                
            ])


          return {
                    access_token,
                    refresh_token
                 }
    }
    async updateUserRefreshTokenHash(_id:ObjectId,refresh_token:string):Promise<void>{
        const hash = await argon2.hash(refresh_token);
        await this.userService.findAndUpdate({_id},{refresh_token_hash:hash});

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
    async login(user:LoginDTO){
        const userDb = await this.userService.findUserByEmail(user.email,true);
        if(!userDb){
            throw new ForbiddenException("user not found");
        }
        if(!this.comparePassword(user.password,userDb.password)){
            throw new ForbiddenException("wrong password");
        }
        const tokens = await this.generateTokens({email:userDb.email,fullName:userDb.fullName,sub:userDb._id});
        await this.updateUserRefreshTokenHash(userDb._id,tokens.refresh_token);
        return tokens;


    }
    

}