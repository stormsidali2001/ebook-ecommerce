import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "../core/dtos/user.dto";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}

    @Post('register')
    async register(@Body() user:CreateUserDTO){
        await this.authService.register(user);
    }
}