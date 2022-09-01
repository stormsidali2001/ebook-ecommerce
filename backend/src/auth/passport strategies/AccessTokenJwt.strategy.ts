import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtPayload } from "../types/tokens.interface";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy,'jwt-access-token'){
    constructor(
        private configService:ConfigService
    ){
        super({
            ignoreExpiration:true,
            secretOrKey:configService.get('JWT_ACCESS_TOKEN_SECRET')

        })
    }
    validate(payload:jwtPayload){
        return payload;
    }
}