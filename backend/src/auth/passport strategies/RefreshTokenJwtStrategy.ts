import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtPayload } from "../types/tokens.interface";



@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(Strategy,'jwt-refresh-token'){
    constructor(
             private  configService:ConfigService
        ){
        super({
            secretOrKey:configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            ignoreExpiration:false,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback:true
        })
    }
    validate(request:Request,payload:jwtPayload){
        const refresh_token =   request?.headers?.authorization?.replace('Bearer','').trim();
        if(!refresh_token){
            throw new ForbiddenException("authorization header is mal formated");
        }
        return {
            ...payload,
            refresh_token
        }
    }
}