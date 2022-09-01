import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductDTO } from "../core/dtos/product.dto";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController{
    constructor(
        private productService:ProductService
    ){}
    
    @Post()
    async createProduct(@Body() product:CreateProductDTO){
        return await this.productService.create(product);
    }
}