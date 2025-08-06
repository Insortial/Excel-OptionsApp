import React, { useContext, useEffect, useState } from 'react'
import { AuthInfoContextType, AuthState, AuthUpdateContextType, LoggedInUpdateContextType, RefreshContextType, DecodedToken } from '@excelcabinets/excel-types/AuthContextTypes';
import { jwtDecode } from 'jwt-decode';

const AuthInfoContext = React.createContext<AuthInfoContextType | null>(null);
const AuthUpdateContext = React.createContext<AuthUpdateContextType | null>(null);
const LoggedInUpdateContext = React.createContext<LoggedInUpdateContextType | null>(null)
const RefreshContext = React.createContext<RefreshContextType | null>(null)

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

export function Refresh() {
    const context = useContext(RefreshContext)

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
    const [authState, setAuthState] = useState<AuthState>({loggedIn: false, email: "", name: "", roles: [], phone: "", accessToken: "token", userID: -1})
    const [tokenLoaded, setTokenLoaded] = useState<boolean>(false)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");    

    const saveAccessToken = async (token: string) => {
        const decodedToken:DecodedToken = await jwtDecode(token)
        const updatedState = setAuthState({
            accessToken: token,
            loggedIn: true,
            email: decodedToken.email,
            name: decodedToken.name,
            phone: decodedToken.phone,
            roles: decodedToken.roles,
            userID: decodedToken.userID
        });

        return updatedState
    }

    const timedSaveAccessToken = (token: string) => {
        setTimeout(() => saveAccessToken(token), 500)
    }

    const refreshToken = async ():Promise<string|null> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/token`, {
                method: "POST",
                headers: myHeaders,
                credentials: "include"
            });    
            const data = await response.json();
            return data.accessToken;
        } catch(err) {
            console.log("REFRESH FAILED")
            console.error(err)
            //navigate("/login", {replace: true})
            return null
        }
    }

    const saveLogInState = (loggedIn: boolean) => {
        setAuthState({...authState, loggedIn: loggedIn})
    }

    useEffect(() => {
        const config:RequestInit = {
            method: "POST",
            headers: myHeaders,
            credentials: "include"
        }

        const getAccessToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/token`, config)
                const data = await response.json()
                /* setAuthState({...authState, loggedIn: true, accessToken: data.accessToken}) */
                saveAccessToken(data.accessToken)
            } catch(err)  {
                console.log(err)
            } 
            setTokenLoaded(true)
        }
            
        getAccessToken()
    }, [])
    

    return (
        <AuthInfoContext.Provider value={{ authState }}>
            <AuthUpdateContext.Provider value={{ saveAccessToken, timedSaveAccessToken }}>
                <LoggedInUpdateContext.Provider value={{ saveLogInState }}>
                    <RefreshContext.Provider value={{ refreshToken }}>
                        {tokenLoaded && children}
                    </RefreshContext.Provider>
                </LoggedInUpdateContext.Provider>
            </AuthUpdateContext.Provider>
        </AuthInfoContext.Provider>
    )
}

export default AuthProvider