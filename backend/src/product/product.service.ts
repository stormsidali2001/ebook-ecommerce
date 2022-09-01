import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateWriteOpResult } from "mongoose";
import { CreateProductDTO, UpdateProductDTO } from "src/core/dtos/product.dto";
import { ProductDocument } from "../core/entities/product.schema";



@Injectable()
export class ProductService{
    constructor(
            @InjectModel('Product') private readonly productModel: Model<ProductDocument>
        ){}

        async create(product:CreateProductDTO):Promise<ProductDocument>{
            const newProduct = new this.productModel(product);
            return  newProduct.save();
        }
        async findAll():Promise<ProductDocument[]>{
            return  this.productModel.find().exec();
        }
        async findById(id:string):Promise<ProductDocument>{
            return  this.productModel.findById(id).exec();
        }
        async updateById(id:string,newProduct:UpdateProductDTO):Promise<UpdateWriteOpResult>{
            Object.keys(newProduct).forEach(key=>{
                if(!newProduct[key]) delete newProduct[key];
            })
            console.log(newProduct,id);
            return  this.productModel.updateOne({_id:id},{$set:{...newProduct}}).exec()
        }

        async deleteProductById(id:string):Promise<any>{
            return  this.productModel.deleteOne({_id:id}).exec();
        }
        

}