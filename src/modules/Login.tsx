import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthUpdate, LoggedInUpdate } from '../context/AuthContext';
import Header from './Header';
import { FormOptionsContextType } from '../types/FormOptions';
import { FormOptionsContext } from '../context/OptionsTemplateContext';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types/AuthContextTypes';


const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { saveAccessToken } = AuthUpdate()
  const { saveLogInState } = LoggedInUpdate()
  const { updateDropDowns } = useContext(FormOptionsContext) as FormOptionsContextType
  const myHeaders = new Headers();
  const navigate = useNavigate();
  myHeaders.append("Content-Type", "application/json");

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = JSON.stringify({
      "email": emailRef.current ? emailRef.current.value : "",
      "password":passwordRef.current ? passwordRef.current.value : ""
    });

    const requestOptions:RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include"
    }
    
    
    const response = await fetch(import.meta.env.VITE_AUTH_URL + "/login", requestOptions)
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json()
    saveAccessToken(data.accessToken)

    if(data.success) {
      const decodedToken:DecodedToken = jwtDecode(data.accessToken)
      const isMeasure = decodedToken !== undefined && decodedToken.roles.find(role => role === "MEASURE")
      updateDropDowns(data.accessToken)
      navigate(isMeasure ? "/pdEditor" : "/jobMenu", {replace: true})
      saveLogInState(true)
    }
  }
  
  return (
    <div id="loginPage">
        <Header />
        <form id="loginDiv" onSubmit={submitLogin}>
            <h2>Login</h2>
            <label htmlFor="loginEmail">Email</label>
            <input id="loginEmail" type="email" ref={emailRef}></input>
            <label htmlFor="loginPass">Password</label>
            <input id="loginPass" type='password' ref={passwordRef}></input>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Login