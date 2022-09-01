import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { HttpExceptionFilter } from './shared/HttpExceptionFilter';
import { LoggingInterceptor } from './shared/LoggingInterceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {provide:APP_INTERCEPTOR , useClass:LoggingInterceptor},
    {provide:APP_FILTER , useClass:HttpExceptionFilter}
  ],
})
export class AppModule {}
