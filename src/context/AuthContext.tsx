import React, { useContext, useEffect, useState } from 'react'
import { AuthInfoContextType, AuthUpdateContextType, LoggedInUpdateContextType } from '../../../types/AuthContextTypes';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from "../../../types/AuthContextTypes"

const AuthInfoContext = React.createContext<AuthInfoContextType | null>(null);
const AuthUpdateContext = React.createContext<AuthUpdateContextType | null>(null);
const LoggedInUpdateContext = React.createContext<LoggedInUpdateContextType | null>(null)
export function AuthInfo() {
    const context = useContext(AuthInfoContext)

    if (context === null) {
        throw Error("Unusable outside of Admin Dashboard")
    }

    return context
}

export function LoggedInUpdate() {
    const context = useContext(LoggedInUpdateContext)

    if (context === null) {
        throw Error("Unusable outside of Admin Dashboard")
    }

    return context
}

export function AuthUpdate() {
    const context = useContext(AuthUpdateContext)

    if (context === null) {
        throw Error("Unusable outside of Admin Dashboard")
    }

    return context
}

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [tokenLoaded, setTokenLoaded] = useState<boolean>(false)
    const [accessToken, setAccessToken] = useState<string>("token")

    const saveAccessToken = (token: string) => {
        const decodedToken:DecodedToken = jwtDecode(token)
        setEmail(decodedToken.email)
        setName(decodedToken.name)
        setPhone(decodedToken.phone)
        setAccessToken(token)
    }

    const saveLogInState = (loggedIn: boolean) => {
        setLoggedIn(loggedIn)
    }

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const config:RequestInit = {
            method: "POST",
            headers: myHeaders,
            credentials: "include"
        }

        const getAccessToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/token`, config)
                const data = await response.json()
                saveAccessToken(data.accessToken)
                setLoggedIn(true)
            } catch(err)  {
                console.log(err)
            } 
            setTokenLoaded(true)
        }
            
        getAccessToken()
    }, [])
    

    return (
        <AuthInfoContext.Provider value={{ accessToken, loggedIn, email, name, phone }}>
            <AuthUpdateContext.Provider value={{ saveAccessToken }}>
                <LoggedInUpdateContext.Provider value={{ saveLogInState }}>
                    {tokenLoaded && children}
                </LoggedInUpdateContext.Provider>
            </AuthUpdateContext.Provider>
        </AuthInfoContext.Provider>
    )
}

export default AuthProvider