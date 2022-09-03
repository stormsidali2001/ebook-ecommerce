import axios from "axios";
import { DecodedJwt } from "../models/DecodedJwt.interface";
import { DisplayUser } from "../models/DisplayUser.interface";
import { Jwt } from "../models/Jwt";
import { LoginUser } from "../models/LoginUser.interface";
import { NewUser } from "../models/NewUser";
import jwt_decode from 'jwt-decode'
const register = async (newUser:NewUser):Promise<DisplayUser | null>=>{
    console.log(`${process.env.REACT_APP_BASE_API}/auth/register`)
    const response = await axios.post(`http://localhost:8080/api/auth/register`, newUser)
    return response.data;
}

const login = async (user:LoginUser):Promise<{user:DisplayUser| null , jwt:Jwt| null} | null>=>{
    const response = await axios.post(`http://localhost:8080/api/auth/login`, user);
    if(response.data){
        const tokens:Jwt = response.data;
        console.log('jwt',response.data )
        localStorage.setItem('jwt',JSON.stringify(tokens));
        const decodedJwt:DecodedJwt = jwt_decode(tokens.access_token)
        console.log(1,decodedJwt)
        localStorage.setItem('user',JSON.stringify(decodedJwt.user));
        return {jwt:tokens , user:decodedJwt.user}
    }
    return {jwt:null , user:null}
}

// const verifyJwt = async(jwt:string):Promise<boolean>=>{
//     const response = await axios.post(`http://localhost:8080/api/auth/verify-jwt`, jwt);
//     if(response.data){
//         const {}
//     }
// }

const logout = ():void =>{
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
}
const authService = {
    register,
    login,
    logout
};
export default authService;