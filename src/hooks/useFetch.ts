import { useNavigate } from 'react-router-dom';
import { AuthInfo, AuthUpdate } from '../context/AuthContext';

const useFetch = () => {
    const { saveAccessToken } = AuthUpdate()
    const { accessToken } = AuthInfo()
    const myHeaders = new Headers();
    const navigate = useNavigate()
    myHeaders.append("Content-Type", "application/json");

    let config:RequestInit = {
        headers: myHeaders,
        credentials: "include"
    }

    const originalRequest = async (url: string, reqConfig:RequestInit) => {
        url = `${import.meta.env.VITE_BACKEND_URL}${url}`
        const response = await fetch(url, reqConfig)
        return response
    }

    const refreshToken = async () => {
        config.method = "POST"
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/token`, config)
            const data = await response.json()   
            saveAccessToken(data.accessToken)
            return data.accessToken
        } catch (err) {
            let message = 'Unknown Error'
            if (err instanceof Error) message = err.message
            reportError({ message })
            return undefined
        }
    }

    const callFetch = async (url:string, requestType:string, body?:BodyInit) => {
        myHeaders.set("Authorization", `Bearer ${accessToken}`)
        config = {
            headers: myHeaders,
            credentials: "include"
        }
        config.method = requestType

        if(requestType === "POST")
            config.body = body ?? {} as BodyInit

        let response = await originalRequest(url, config)
        if(response.status == 401) {
            const newAccessToken = await refreshToken()
            if(accessToken == undefined) {
                navigate("/login", { replace: true })
                return response
            }
            config.method = requestType
            myHeaders.set("Authorization", `Bearer ${newAccessToken}`)
            response = await originalRequest(url, config)
            return response
        }
        return response
    }

    return callFetch
}

export default useFetch