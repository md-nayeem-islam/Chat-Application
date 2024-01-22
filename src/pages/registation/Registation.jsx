import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import './registaion.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import img from '../../images/registation.jpg'
import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import { useFormik } from 'formik';
import { singUpSchema } from '../../schema/Index';
import Navauthentication from '../../Component/Navauthentication'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 
const initialValues = {
  name:"",
  email:"",
  password:"",
};


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

              <h3 className='registationHeading'>Get started with easily register</h3>
            <span>Free register and you can enjoy it</span>
              <form onSubmit={handleSubmit}>
                <div className="loginInformation">
                  <div><TextField  className='loginEmail' id="standard-basic" label="Email Addres" variant="standard" type='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                  { errors.email && touched.email ?(<p className='registation-error'>{errors.email}</p>) :null}
                  </div>
                  <div><TextField  className='loginName' id="standard-basic" label="Full Name" variant="standard" name='name' type='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                  { errors.name && touched.name ?(<p className='registation-error'>{errors.name}</p>) :null}
                  </div>
                  <div><TextField  className='registationPassword' id="standard-basic" label="Password" variant="standard" type={passwordType} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                  { errors.password && touched.password ?(<p className='registation-error'>{errors.password}</p>) :null}
                  <span className='registationIcon' onClick={handelToggle}>{passwordIcon}</span>
                  </div>
                </div>
                <div className="registationBtn">
                  <Button variant="contained" type='submit'>Sing Up</Button>
                </div>
              </form>
              <div className="navAuthentication">
                <Navauthentication style="loginauth" text="Already  have an account ?" linkText="Sugn in" link="/"></Navauthentication>
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