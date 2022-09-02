import { Box, Button, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import {FC , FormEvent} from 'react';
const RegistrationForm:FC = () => {
    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
    }
  return (
    <Box sx={{border:1 , padding:2,borderColor:'#cccccc',width:'350px',marginTop:2}}>
        <form onSubmit={handleSubmit}>
            <Grid container direction='column' justifyContent='flex-start'>
                <Typography variant='h4' component='h1'>Create Account</Typography>
                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='name'>Your Name</InputLabel>
                <TextField type='text' name='name' id = 'name' variant='outlined' size='small'/>

                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='email'>Email</InputLabel>
                <TextField type='email' name='email' id = 'email' variant='outlined' size='small'/>

                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='password'>Password</InputLabel>
                <TextField type='password' placeholder='Minimum 6 characters required' name='password' id = 'password' variant='outlined' size='small'/>

                <InputLabel sx={{fontWeight:500 , marginTop:1 , color:'#000000'}} htmlFor='confirmPassword'>Re-enter Password</InputLabel>
                <TextField type='confirmPassword'  name='confirmPassword' id = 'confirmPassword' variant='outlined' size='small'/>

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