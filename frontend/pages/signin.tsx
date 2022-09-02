import { NextPage } from "next";
import AuthLayout from "../features/auth/components/AuthLayout";
import SignInForm from "../features/auth/components/SignInForm";

const SignInPage:NextPage = ()=>{
    return (
       <AuthLayout>
            <SignInForm></SignInForm>
       </AuthLayout>
    )
} 
export default SignInPage;