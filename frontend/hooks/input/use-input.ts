import { ChangeEvent, useReducer } from "react";
import { Action } from "../../shared/models/actions.interface";
import { ValidatorFn } from "../../shared/utils/validation/models/ValidatorFn";
import { InputActionType, INPUT_ACTION_BLUR, INPUT_ACTION_CHANGE, INPUT_ACTION_CLEAR } from "./models/InputAction";
import { InputState } from "./models/InputState.interface";

const initialInputState:InputState={
    text:'',
    hasBeenTouched:false
}
const inputReducer = (state:InputState,action:Action<InputActionType>)=>{
    const {type , value = ''} = action;
    switch (type) {
        case INPUT_ACTION_CHANGE:
            return {...state,text:value}
        case INPUT_ACTION_BLUR:
            return {...state,hasBeenTouched:true}
        case INPUT_ACTION_CLEAR:
            return {text:'',hasBeenTouched:false}
    
        default:
            return {...state};
    }
}
const useInput = (validatorFn?:ValidatorFn)=>{
    const [{text,hasBeenTouched} ,dispatch] = useReducer(inputReducer,initialInputState);
    let shouldDisplayError;
    if(validatorFn){
        const isValid = validatorFn(text);
        shouldDisplayError = !isValid && hasBeenTouched; 
    }
    const textChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch({type:INPUT_ACTION_CHANGE,value:e.target.value})
    }
    const inputBlurHandler = ()=>{
        dispatch({type:INPUT_ACTION_BLUR})
    }
    const InputClearHandler = ()=>{
        dispatch({type:INPUT_ACTION_CLEAR})
    }
    
    return {
        text,
        shouldDisplayError,
        textChangeHandler,
        inputBlurHandler,
        InputClearHandler
    }
}

export default useInput;