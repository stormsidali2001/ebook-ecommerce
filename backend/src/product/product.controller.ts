import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UpdateWriteOpResult } from "mongoose";
import { JwtAccessTokenGuard } from "../auth/guards/JwtAccesTokenGuard";
import { ProductDocument } from "../core/entities/product.schema";
import { CreateProductDTO, UpdateProductDTO } from "../core/dtos/product.dto";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController{
    constructor(
        private productService:ProductService
    ){}
    
    @UseGuards(JwtAccessTokenGuard)
    @Post()
    async createProduct(@Body() product:CreateProductDTO):Promise<ProductDocument>{
        return await this.productService.create(product);
    }

    @Get()
    async findAll():Promise<ProductDocument[]>{
        return await this.productService.findAll();
    }
    @Get(':id')
    async findById(@Param('id') id:string):Promise<ProductDocument>{
        return await this.productService.findById(id);
    }
    @Put(':id')
    async updateById(@Param('id') id:string,@Body() newProduct:UpdateProductDTO):Promise<UpdateWriteOpResult>{
        return await this.productService.updateById(id,newProduct);
    }
    @Delete(':id')
    async deleteProductById(@Param('id') id:string):Promise<any>{
        return await this.productService.deleteProductById(id);
    }
}