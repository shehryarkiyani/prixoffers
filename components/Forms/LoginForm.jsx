import { loginUser } from "@/redux/auth/action-creators";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { setCookie } from "cookies-next";
import * as Yup from "yup";
import { useState } from "react";
import { setShowJoinModal } from "@/redux/joinModalSlice";
import { FormattedMessage } from 'react-intl';
import {auth,provider} from "../../firebaseConfig"
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const[loading1,setLoading1]=useState(false)
  const router=useRouter()
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    setLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/logIn`,
      headers: {
        Authorization: "Bearer {{jwt}}",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setCookie("token", response.data.token);
        dispatch(loginUser(response.data.user));
        console.log(response.data.user)
        setLoading(false);
        dispatch(setShowJoinModal(false));
      }) 
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
const handleClick=async()=>{

  let url=`${process.env.NEXT_PUBLIC_API_URL}/users/me`
  var axios = require("axios");
  signInWithPopup(auth, provider)
  .then(async(result)=>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const userdata=JSON.stringify(
      {
        email:user.email,
        socialType:'google',
        name:user.displayName,
        image:user.photoURL,
        username:user.displayName,

  
      }
    )
  
    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/sociallogin`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: userdata,
    };
    setLoading1(true)
    axios(config)
    .then(function (response) {
      router.push('/')
      localStorage.setItem("token",JSON.stringify(response.data.token))
      setCookie("token", response.data.token);
      dispatch(loginUser(response.data.user));
      
      setLoading1(false);
      dispatch(setShowJoinModal(false));
      
    }) 
    .catch(function (error) {
      console.log(error);
      setLoading1(false);
    });
    console.log(user,"user",token,"token","userdata",userdata)
  }).catch(function (error) {
    console.log(error);
    
  });
}
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="focus:outline-none border border-gray-500 p-2 rounded-lg w-full mt-1"
              />
              <div className="text-xs">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="focus:outline-none border border-gray-500 p-2 rounded-lg w-full mt-1"
              />
              <div className="text-xs">
                <ErrorMessage name="password" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-danger font-bold py-2 px-2 w-full mt-2 rounded-lg"
            >
              {loading ? <FormattedMessage id="Loading"/> : <FormattedMessage id="Login"/>}
            </button>
            <button
            onClick={handleClick}
              type="button"
              className="bg-danger font-bold py-2 px-2 w-full mt-2 rounded-lg"
            >
              {loading1 ? <FormattedMessage id="Loading"/> : <FormattedMessage id="Login With Google"/>}
              
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
