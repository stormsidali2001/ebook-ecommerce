export interface Product{
    name: string;
    price: number;
}
export interface ProductDocument extends Product{
    _id:string;
    _v:number;
}