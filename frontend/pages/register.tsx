import { NextPage } from "next";
import AuthLayout from "../features/auth/components/AuthLayout";
import RegistrationForm from "../features/auth/components/RegistrationForm";

const RegisterPage:NextPage = ()=>{
    return (
        <AuthLayout>
            <RegistrationForm/>
        </AuthLayout>
    )
} 
export default RegisterPage;