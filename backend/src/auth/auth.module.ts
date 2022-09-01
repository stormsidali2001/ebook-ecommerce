import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAccessTokenStrategy } from "./passport strategies/AccessTokenJwt.strategy";
import { RefreshTokenJwtStrategy } from "./passport strategies/RefreshTokenJwtStrategy";

@Module({
    imports:[
        UserModule,
        JwtModule.register({})
    ],
    controllers:[AuthController],
    providers:[AuthService , JwtAccessTokenStrategy,RefreshTokenJwtStrategy]
})
export class AuthModule{};