import { getToken } from './refreshToken';

const useFetch = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let config:RequestInit = {
        headers: myHeaders,
        credentials: "include"
    }

    const originalRequest = async (url: string, reqConfig:RequestInit) => {
        url = `${url}`
        const response = await fetch(url, reqConfig)
        return response
    }

    const callFetch = async (route:string, requestType:string, body?:BodyInit, url:string=import.meta.env.VITE_BACKEND_URL) => {
        const accessToken = await getToken()
        myHeaders.set("Authorization", `Bearer ${accessToken}`)
        config = {
            headers: myHeaders,
            credentials: "include"
        }
        config.method = requestType

        if(["POST", "PUT"].includes(requestType))
            config.body = body ?? {} as BodyInit

        const response = await originalRequest(`${url}${route}`, config)
        return response
    }

    return callFetch
}

export default useFetch