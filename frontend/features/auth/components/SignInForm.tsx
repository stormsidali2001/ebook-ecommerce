import { Box, Button, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import {FC , FormEvent} from 'react';
import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
const SignInForm = () => {
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
function clearForm(){
    
        emailClearHandler();
        passwordClearHandler();
    }
const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if( emailHasError || passwordHasError ) return;
        if( email.length === 0  || password.length === 0  ) return;
        
      
       
        clearForm();
}
  return (
    <>
    <Box sx={{border:1 , padding:2,borderColor:'#cccccc',width:'350px',marginTop:2}}>
    <form onSubmit={handleSubmit}>
        <Grid container direction='column' justifyContent='flex-start'>
            <Typography variant='h4' component='h1'>Sign-In</Typography>
           
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


            <Button style={{marginTop:'16px',height:'31px',background:'#f0c14b',color:"black",borderColor:'#a88734 #9c7r31 #846a29',textTransform:'none'}} variant='contained' type='submit'>Sign-In</Button>
        </Grid>
    </form>
    <div style={{marginTop:'30px'}}>
        <small>
            <span>By contining , you agree to Amazon's</span>
        </small>
    </div>
    <div >
        <small>
           <a href="#" style={{textDecoration:'none',color:'blueviolet'}}>{' '}Conditions of use</a>{' '}and{' '}<a href='#' style={{textDecoration:'none',color:'blueviolet'}}>Privacy policy</a>
        </small>
    </div>
  


</Box>
<div style={{marginTop:'16px'}}>
    <Divider>
        <small style={{color:'#767676'}}>New to Amazon?</small>
    </Divider>
        <div style={{marginTop:'30px'}}>
            <small>
                <span>By creating an account, you agree to Amazon's</span>
            </small>
        </div>
        <div >
            <small>
            Already have an account?{' '}<Link href='/register' ><a style={{textDecoration:'none',color:'blueviolet'}}>  <Button style={{width:'100%',marginTop:'12px',height:'31px',background:'#f1f1f1',color:"black",borderColor:'#a88734 #9c7r31 #846a29',textTransform:'none'}} variant='contained' type='submit'>Register</Button></a></Link>
            </small>
        </div>
</div>
  
</>
  )
}

export default SignInForm