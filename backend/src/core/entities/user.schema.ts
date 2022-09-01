import { Prop, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;
export class User{
    @Prop({required:true})
    email:string;

    @Prop({required:true})
    password:string;

}

export const UserSchema = SchemaFactory.createForClass(User);