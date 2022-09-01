import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDTO } from "src/core/dtos/product.dto";
import { ProductDocument } from "../core/entities/product.schema";



@Injectable()
export class ProductService{
    constructor(
            @InjectModel('Product') private readonly productModel: Model<ProductDocument>
        ){}

        async create(product:CreateProductDTO):Promise<ProductDocument>{
            const newProduct = new this.productModel(product);
            return await newProduct.save();
        }


}