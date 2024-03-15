import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import userImg from '../../images/photo.png'
// import { Link, useNavigate } from 'react-router-dom';
import './registaion.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import img from '../../images/registation.jpg'
import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import { useFormik } from 'formik';
import { singUpSchema } from '../../schema/Index';
import Navauthentication from '../../Component/Navauthentication'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import {  RotatingLines, } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

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
  
  const db = getDatabase();
  const auth = getAuth();
  const notify = () => toast("Wow so easy!");
  const navigate = useNavigate();

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues,
    validationSchema : singUpSchema,
    onSubmit : (values, action) => {
      setLoader(true)
      createUserWithEmailAndPassword(auth, values.email, values.password).then((userCredential) =>{
        sendEmailVerification(auth.currentUser).then(()=>{
          // console.log(userCredential.user.emailVerified);
          navigate('/');
          updateProfile(auth.currentUser,{
            displayName :values.name, 
            photoURL :'https://shorturl.at/dtwO6',
          }).then(()=>{
            set(ref(db, 'users/' + userCredential.user.uid), {
              username: userCredential.user.displayName,
              email: userCredential.user.email,
              profileImg : userCredential.user.photoURL
            }).then(()=>{
              console.log(userCredential.user);
            })
          })
        })
      }).catch((error) =>{
        const errorCode = error.code;
        const errorMessage = error.message;
       if(errorCode == "auth/email-already-in-use"){
        toast.error('🦄 This Email alredy existed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
       }
      //  console.log(errorMessage);
      })
      // console.log(values);
      action.resetForm();
      setTimeout(()=>{
        setLoader(false)
      },2000)
    }
  });

  
 const [ loader, setLoader] = useState(false)
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

                <h3 className='registationHeading'>Get started with easily register</h3>
              <span>Free register and you can enjoy it</span>
                <form onSubmit={handleSubmit}>
                  <div className="loginInformation">
                    <div><TextField  className='loginEmail' id="loginEmail" label="Email Addres" variant="standard" type='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    { errors.email && touched.email ?(<p className='registation-error'>{errors.email}</p>) :null}
                    </div>
                    <div><TextField  className='loginName' id="loginName" label="Full Name" variant="standard" name='name' type='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    { errors.name && touched.name ?(<p className='registation-error'>{errors.name}</p>) :null}
                    </div>
                    <div><TextField  className='registationPassword' id="registationPassword" label="Password" variant="standard" type={passwordType} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                    { errors.password && touched.password ?(<p className='registation-error'>{errors.password}</p>) :null}
                    <span className='registationIcon' onClick={handelToggle}>{passwordIcon}</span>
                    </div>
                  </div>
                  <div className="registationBtn">
                    <Button variant="contained" type='submit'>{
                      loader ?
                      <div className="loader">
                          <RotatingLines
  visible={true}
  height="25"
  width="25"
  color="#fff"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
                      </div>
                       :
                       "Sing up"
                    }</Button>
                    
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
    </>
  );
}