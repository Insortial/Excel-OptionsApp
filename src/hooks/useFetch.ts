import { AuthInfo, AuthUpdate } from '../context/AuthContext.tsx';

const useFetch = () => {
    const { authState } = AuthInfo()
    const { timedSaveAccessToken } = AuthUpdate()
    //const navigate = useNavigate()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let config:RequestInit = {
        headers: myHeaders,
        credentials: "include"
    }

    const refreshToken = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/token`, {
                method: "POST",
                headers: myHeaders,
                credentials: "include"
            });    
            const data = await response.json();
            return data.accessToken;
        } catch(err) {
            console.error(err)
            console.log("REFRESH FAILED")
            //navigate("/login", {replace: true})
            return null
        }
        
    }

    const originalRequest = async (baseURL:string, url: string, reqConfig:RequestInit) => {
        url = `${baseURL}${url}`
        const response = await fetch(url, reqConfig)
        return response
    }

    const callFetch = async (url:string, requestType:string, body?:BodyInit, baseURL:string=import.meta.env.VITE_BACKEND_URL) => {
        myHeaders.set("Authorization", `Bearer ${authState.accessToken}`)
        config = {
            headers: myHeaders,
            credentials: "include"
        }
        config.method = requestType

        if(["POST", "PUT", "PATCH"].includes(requestType))
            config.body = body ?? {} as BodyInit

        let response = await originalRequest(baseURL, url, config)

        if(response.status === 401) {
            const newToken = await refreshToken()
            if(!newToken) {
                console.log("NEW TOKEN FAILED")
                return response
            } else {
                timedSaveAccessToken(newToken)
                myHeaders.set("Authorization", `Bearer ${newToken}`)
                response = await originalRequest(baseURL, url, config)
            }
        }
        return response
    }

    return callFetch
}

export default useFetch