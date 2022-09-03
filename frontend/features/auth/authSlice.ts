import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { DisplayUser } from "./models/DisplayUser.interface";
import { Jwt } from "./models/Jwt";
import { LoginUser } from "./models/LoginUser.interface";
import { NewUser } from "./models/NewUser";
import authService from "./services/auth.service";

// const storedUser:string | null = window.localStorage.getItem('user');
// const storedJwt:string | null =  window.localStorage.getItem("jwt");

// const user:DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;
// const jwt:Jwt = !!storedJwt ? JSON.parse(storedJwt): null;

interface AsyncState{
    isLoading:boolean;
    isSuccess:boolean;
    isError:boolean;
}
interface AuthState extends AsyncState{
    user?:DisplayUser | null;
    jwt?:Jwt | null;
    isAuthenticated?:boolean
}
const initialState:AuthState = {
    isLoading:false,
    isSuccess:false,
    isError:false,
    user:null,
    jwt:null,
    isAuthenticated:false
}
export const register = createAsyncThunk(
    'auth/register',
    async (user:NewUser,thunkAPI)=>{
        try{
            return await authService.register(user);
        }catch(err){
            return thunkAPI.rejectWithValue('Unable to register')
        }
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async (user:LoginUser,thunkAPI)=>{
        try{
            return await authService.login(user);
        }catch(err){
            return thunkAPI.rejectWithValue('Unable to sign-in')
        }
    }
)
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers:(builder)=>{
        builder
        //Register
        .addCase(register.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(register.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
            state.user = null;
        })
        //Login
        .addCase(login.pending,(state)=>{
        state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.jwt = action.payload?.jwt;
            state.user = action.payload?.user
            state.isAuthenticated = true;
        })
        .addCase(login.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
            state.user = null;
            state.isAuthenticated = false;
        })

    }
})

export const selectedUser = (state:RootState)=>state.auth;
export const {reset} = authSlice.actions;
export default authSlice.reducer;