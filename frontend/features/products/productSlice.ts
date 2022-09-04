import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "./models/Cart";
import { ProductDocument } from "./models/Product";
import productService from "./services/product.service";

interface AsyncState{
    isLoading:boolean;
    isSuccess:boolean;
    isError:boolean;
}
interface ProductState extends AsyncState{
    products:ProductDocument[];
    cart:Cart;
}
const initialState:ProductState = {
    products:[],
    cart:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
}

export const getProducts = createAsyncThunk(
    'product',
    async ()=>{
        try{
            return await productService.getProducts();
        }catch(err){
            console.log('Error: ',err)
        }
    }
)

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProducts.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload?.data || [];
        })
        .addCase(getProducts.rejected,(state)=>{
            state.isLoading = false;
            state.products = [];
            state.isError = true;
        })

    }
})

export default productSlice.reducer;