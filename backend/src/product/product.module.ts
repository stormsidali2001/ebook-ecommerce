import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { ProductSchema } from "../core/entities/product.schema";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";


@Module({
    imports:[MongooseModule.forFeature([{name:'Product',schema:ProductSchema}]),AuthModule],
    providers:[ProductService],
    controllers:[ProductController],
})
export class ProductModule{

}