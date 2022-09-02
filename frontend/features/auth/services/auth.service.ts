import axios from "axios";
import { DisplayUser } from "../models/DisplayUser.interface";
import { NewUser } from "../models/NewUser";

const register = async (newUser:NewUser):Promise<DisplayUser | null>=>{
    console.log(`${process.env.REACT_APP_BASE_API}/auth/register`)
    const response = await axios.post(`http://localhost:8080/api/auth/register`, newUser)
    return response.data;
}
const authService = {
    register,
}
export default authService;