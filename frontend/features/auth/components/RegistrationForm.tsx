import { Box, Button, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import {FC , FormEvent} from 'react';
import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validateNameLength, validatePasswordLength } from '../../../shared/utils/validation/length';
import { NewUser } from '../models/NewUser';
const RegistrationForm:FC = () => {
    const { 
        text : name,
        shouldDisplayError : nameHasError,
        textChangeHandler : nameChangeHandler,
        inputBlurHandler : nameBlurHandler,
        InputClearHandler : nameClearHandler 
    } = useInput(validateNameLength);

    const { 
        text:email,
        shouldDisplayError : emailHasError,
        textChangeHandler : emailChangeHandler,
        inputBlurHandler : emailBlurHandler,
        InputClearHandler : emailClearHandler 
    } = useInput(validateEmail);

    const { 
        text:password,
        shouldDisplayError : passwordHasError,
        textChangeHandler : passwordChangeHandler,
        inputBlurHandler : passwordBlurHandler,
        InputClearHandler : passwordClearHandler 
    } = useInput(validatePasswordLength);

    const { 
        text:confirmPassword,
        shouldDisplayError : confirmPasswordHasError,
        textChangeHandler : confirmPasswordChangeHandler,
        inputBlurHandler : confirmPasswordBlurHandler,
        InputClearHandler : confirmPasswordClearHandler 
    } = useInput(validatePasswordLength);


    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(password !== confirmPassword) return ;
        if(nameHasError || emailHasError || passwordHasError || confirmPasswordHasError) return;
        if(name.length  === 0 || email.length === 0  || password.length === 0 || confirmPassword.length === 0 ) return;
        
        const newUser:NewUser = {
            email,
            password,
            name
        }
        console.log("new user",newUser);
        clearForm();
    }
    function clearForm(){
        nameClearHandler();
        emailClearHandler();
        passwordClearHandler();
        confirmPasswordClearHandler();
    }
  return (
    <Box sx={{border:1 , padding:2,borderColor:'#cccccc',width:'350px',marginTop:2}}>
        <form onSubmit={handleSubmit}>
            <Grid container direction='column' justifyContent='flex-start'>
                <Typography variant='h4' component='h1'>Create Account</Typography>
                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='name'>Your Name</InputLabel>
                <TextField 
                    type='text' 
                    name='name' 
                    id = 'name' 
                    variant='outlined' 
                    size='small'
                    value={name}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    error={nameHasError}
                    helperText = {nameHasError ? 'Enter your name':''}
                />

                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='email'>Email</InputLabel>
                <TextField 
                    type='email' 
                    name='email' 
                    id = 'email' 
                    variant='outlined' 
                    size='small'
                    value={email}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    error={emailHasError}
                    helperText = {emailHasError?"Enter your email":""}
                />

                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='password'>Password</InputLabel>
                <TextField 
                    type='password' 
                    placeholder='Minimum 6 characters required' 
                    name='password' 
                    id = 'password' 
                    variant='outlined' 
                    size='small'
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    value={password}
                    error={passwordHasError}
                    helperText = {passwordHasError?"minimum 6 characters required":""}
                />

                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='confirmPassword'>Re-enter Password</InputLabel>
                <TextField 
                    type='password'  
                    name='confirmPassword' 
                    id = 'confirmPassword' 
                    variant='outlined' 
                    size='small'
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordBlurHandler}
                    value={confirmPassword}
                    error={confirmPassword.length > 0 && password !== confirmPassword}
                    helperText = {confirmPasswordHasError?"passwords don't match":""}
                />

                <Button style={{marginTop:'16px',height:'31px',background:'#f0c14b',color:"black",borderColor:'#a88734 #9c7r31 #846a29',textTransform:'none'}} variant='contained' type='submit'>Register</Button>
            </Grid>
        </form>
        <div style={{marginTop:'30px'}}>
            <small>
                <span>By creating an account, you agree to Amazon's</span>
            </small>
        </div>
        <div >
            <small>
               <a href="#" style={{textDecoration:'none',color:'blueviolet'}}>{' '}Conditions of use</a>{' '}and{' '}<a href='#' style={{textDecoration:'none',color:'blueviolet'}}>Privacy policy</a>
            </small>
        </div>
        <Divider sx={{marginTop:'36px',marginBottom:'36px'}}/>
        <div style={{marginTop:'30px'}}>
            <small>
                <span>By creating an account, you agree to Amazon's</span>
            </small>
        </div>
        <div >
            <small>
              Already have an account?{' '}<Link href='/signin' ><a style={{textDecoration:'none',color:'blueviolet'}}>SignIn</a></Link>
            </small>
        </div>
        <div >
            <small>
              Buying for work?{' '}<Link href='/signin' ><a style={{textDecoration:'none',color:'blueviolet'}}>Create a free business account</a></Link>
            </small>
        </div>


    </Box>
  )
}

export default RegistrationForm;