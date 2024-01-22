import * as Yup from "yup";

export const singUpSchema= Yup.object({
    email: Yup.string().email().required("Please Enter your Email"),
    password: Yup.string().min(6).required("Please Enter Your Password"),
    name: Yup.string(). min(3).max(20).required("Please Enter Your Name"),
})