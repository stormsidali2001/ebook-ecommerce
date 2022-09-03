import { NextPage } from "next"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks"

function PrivateRoute({page}:{page:NextPage}) {
    const dispatch = useAppDispatch();
    const { isSuccess , isAuthenticated , jwt} = useAppSelector(state=>state.auth);
    useEffect(()=>{
        if(!jwt){
            
        }
    },[jwt , isSuccess])
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute