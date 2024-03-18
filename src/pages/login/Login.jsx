import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link, Navigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import './login.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import img from '../../images/login.jpg'
import { useFormik} from 'formik';
import { singUpSchema} from '../../schema/Index';
import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import Navauthentication from '../../Component/Navauthentication';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../slices/userSlice';


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
  name : '',
}

export default function BasicGrid() {
  
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues,
    validationSchema : singUpSchema,
    onSubmit : (values, action) => {
      signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential) =>{
        if(userCredential.user.emailVerified){
          localStorage.setItem('user', JSON.stringify(userCredential.user))
          navigate('./home')
          dispatch(loginUser(userCredential.user))
        }else{
          signOut(auth).then(() => {
            console.log('signOut done');          
            toast.error('🦄 Email not verifide', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          })
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    
      // console.log(values);
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

    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    
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
                <div><TextField  className='loginEmail' id="loginEmail" label="Email Addres" variant="standard" type='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    { errors.email && touched.email ?(<p className='registation-error'>{errors.email}</p>) :null}
                    </div>

                    <div><TextField  className='loginName' id="loginName" label="Full Name" variant="standard" name='name' type='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    { errors.name && touched.name ?(<p className='registation-error'>{errors.name}</p>) :null}
                    </div>
                  
                  <div><TextField  className='loginPassword' id="standard" label="Password" variant="standard" type={passwordType} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
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
    </>
  );
}