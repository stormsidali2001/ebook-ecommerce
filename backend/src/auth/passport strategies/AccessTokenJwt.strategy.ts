import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtPayload } from "../types/tokens.interface";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy,'jwt-access-token'){
    constructor(
        private configService:ConfigService
    ){
        super({
            secretOrKey:configService.get('JWT_ACCESS_TOKEN_SECRET'),
            ignoreExpiration:false,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
            

        })
    }
    validate({user}:{user:jwtPayload}){
        return user;
    }
}