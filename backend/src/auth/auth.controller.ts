import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDTO, LoginDTO } from "../core/dtos/user.dto";
import { AuthService } from "./auth.service";
import { JwtRefreshTokenGuard } from "./guards/JwtRefreshTokenGuard";
import { JwtPayloadWithRefreshToken } from "./types/JwtPayloadWithRefreshToken";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}

    @Post('register')
    async register(@Body() user:CreateUserDTO){
        return await this.authService.register(user);
    }

    @Post('login')
    async login(@Body() user:LoginDTO){
        return this.authService.login(user);
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Post('refresh-token')
    async refreshToken(@Req() request:Request){
        const user = <JwtPayloadWithRefreshToken>request.user;
        const refresh_token = user.refresh_token;
        return await this.authService.refreshToken(user.sub,refresh_token)
    }
}