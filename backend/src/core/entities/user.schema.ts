import { Prop, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;
export class User{
    
    @Prop({required:true})
    fullName:string;
    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    password:string;

}

export const UserSchema = SchemaFactory.createForClass(User);