import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import './login.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import img from '../../images/login.jpg'
import { useFormik} from 'formik';
import { singUpSchema} from '../../schema/Index';
import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import Navauthentication from '../../Component/Navauthentication';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const initialValues = {
  email:"",
  password:"",
}

export default function BasicGrid() {

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues,
    validationSchema : singUpSchema,
    onSubmit : (values, action) => {
      console.log(values);
      action.resetForm();
    }
  });

  const [passwordType, setPasswordType] = useState('password')
  const [passwordIcon, setPasswordIcon] = useState(<IoEyeOffOutline/>)

  const handelToggle = () => {
    if( passwordType === "password"){
      setPasswordType('text')
      setPasswordIcon(IoEyeOutline)
    }else{
      setPasswordType('password')
      setPasswordIcon(IoEyeOffOutline)
    }
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className='loginContant'>
            <div className="containarWrapper">

              <h2 className='loginHeading'>Login to your account!</h2>
              <div className="loginWithGoogle">
                  < FcGoogle  className='googleIcon'/>
                  <span>Login with Google</span>  
              </div>
              <form onSubmit={handleSubmit}>
                <div className="loginInformation">
                  <div><TextField  className='loginEmail' id="standard-basic" label="Email Addres" variant="standard" name='email' type='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                  {errors.email && touched.email ?(<p className='from-errors'>{errors.email}</p>):null}
                  </div>
                  <div><TextField  className='loginPassword' id="standard-basic" label="Password" variant="standard" type={passwordType} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                  {errors.password && touched.password ?(<p className='from-errors'>{errors.password}</p>):null}
                  <span className='loginIcon' onClick={handelToggle}>{passwordIcon}</span>
                  </div>
                </div>
                <div className="loginBtn">
                  <Button variant="contained" type='submit'>Login to Continue</Button>
                </div>
              </form>
              <div className="navAuthentication">
                <Navauthentication style="loginauth" text="Don’t have an account ?" linkText="Sugn up" link="/registation"></Navauthentication>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
         <div className='imgContainar'>
            <img src={img} alt="not found" />
         </div>
        </Grid>
      </Grid>
    </Box>
  );
}