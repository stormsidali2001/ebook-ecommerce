import axios from "axios"
import { ProductDocument } from "../models/Product"

const getProducts = async ()=>{
    const reponse = await axios.get<ProductDocument[]>(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API}/products`);
    return reponse;
}

const productService = {
    getProducts,
}

export default productService;