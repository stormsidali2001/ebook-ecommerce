import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO, LoginDTO } from "../core/dtos/user.dto";
import { AuthService } from "./auth.service";


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
}