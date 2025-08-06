/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthUpdate } from '../context/AuthContext';
import {  SubmitHandler, useForm } from 'react-hook-form';
import Header from './Header';
import { DecodedToken } from '@excelcabinets/excel-types/AuthContextTypes';
import { jwtDecode } from 'jwt-decode';
import { FormOptionsContext } from '../context/OptionsTemplateContext';
import { FormOptionsContextType } from '@excelcabinets/excel-types/FormOptions';

type LoginForm = {
  email: string;
  password: string;
  showPassword: boolean;
}

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors }, watch } = useForm<LoginForm>()
  const { saveAccessToken } = AuthUpdate()
  const { updateDropDowns } = useContext(FormOptionsContext) as FormOptionsContextType
  const [changePassword, setChangePassword] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const navigate = useNavigate();

  const onLoginSubmit:SubmitHandler<LoginForm> = async (body) => {
    const raw = JSON.stringify(body);

    const requestOptions:RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include"
    }
    
    const response = await fetch(import.meta.env.VITE_AUTH_URL + "/login", requestOptions)
    if (!response.ok) {
      setError("root", {type: "manual", message: "Email or password is incorrect"})
      throw new Error(response.statusText);
    }

    const data = await response.json()
    await saveAccessToken(data.accessToken)

    if(data.success) {
      const decodedToken:DecodedToken = jwtDecode(data.accessToken)
      const isMeasure = decodedToken !== undefined && decodedToken.roles.find(role => role === "MEASURE")
      updateDropDowns(data.accessToken)
      navigate(isMeasure ? "/pdEditor" : "/jobMenu", {replace: true})
    }

  }

  const onPasswordResetSubmit:SubmitHandler<LoginForm> = async (body) => {
    const raw = JSON.stringify({email: body.email})

     const requestOptions:RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include"
    }
    
    const response = await fetch(import.meta.env.VITE_AUTH_URL + "/forgotPassword", requestOptions)
    if (!response.ok) {
      setError("root", {type: "manual", message: "Email can't be found"})
      throw new Error(response.statusText);
    }

    const data = await response.json()

    if(data.success) {
      setEmailSent(true)
    }
  }


  return (
    <div id="loginPage">
        <Header currentPage='loggedOut'/>
        {changePassword ?
        <form id="loginDiv" className='authDiv' onSubmit={handleSubmit(onPasswordResetSubmit)}>
          {emailSent ? <>
            <a className='changePasswordTxt' onClick={() => setChangePassword(false)}>Go Back To Login</a>
            <h2>Password Reset Link Sent.</h2>
          </> 
          : <>
            <a className='changePasswordTxt' onClick={() => setChangePassword(false)}>Go Back To Login</a>
            <h2>Send Password Reset Link</h2>
            <label htmlFor="loginEmail">Enter Email Associated With Account</label>
            <input id="loginEmail" type="email" {...register("email", {
              required: "Email is required"
            })}/>
            {errors.email && <p className='errorMessage'>{errors.email.message}</p>}
            <button className='buttonStyle'>Submit</button>
            {errors.root && <p className='errorMessage'>{errors.root.message}</p>}
          </>}
        </form>
        : <form id="loginDiv" className='authDiv' onSubmit={handleSubmit(onLoginSubmit)}>
            <h2>Login</h2>
            <label htmlFor="loginEmail">Email</label>
            <input id="loginEmail" type="email" {...register("email", {
              required: "Email is required"
            })}/>
            {errors.email && <p className='errorMessage'>{errors.email.message}</p>}
            <label htmlFor="loginPass">Password</label>
            <input id="loginPass" type={watch("showPassword") ? 'text' : 'password'} {...register("password", {
              required: "Password is required"
            })}/>
            {errors.password && <p className='errorMessage'>{errors.password.message}</p>}
            <section id="loginOptions">
              <div id="showPasswordDiv">
                <input type="checkbox" id="showPassword" {...register("showPassword")}/>
                <label htmlFor="showPassword">Show Password</label>
              </div>
              <div id="loginLinks">
                <a className='changePasswordTxt' onClick={() => setChangePassword(true)}>Forgot Password</a>
                <a className='changePasswordTxt' href="http://admin.excel.local/register">Register Account</a>
              </div>
              
            </section>
            <button className='buttonStyle'>Submit</button>
            {errors.root && <p className='errorMessage'>{errors.root.message}</p>}
        </form>
        }
    </div>
  )
}

export default Login